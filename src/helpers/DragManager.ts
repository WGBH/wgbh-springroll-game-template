import { DisplayObject, Point, Container, Rectangle, FederatedPointerEvent } from 'pixi.js';
import { Scene } from 'wgbh-springroll-game';

const MIN_DRAG = 10;

/**
 * DragManager - encapsulates drag/sticky-click functionality
 * 
 * requires update() function to be called in render loop.
 * 
 * TODO: may depend on scene and draggableContainer having matching coordinate spaces.
 */
export default class DragManager{

    private selectedObject:DisplayObject;
    private mousePosition = new Point();
    private dragStartPosition = new Point();
    private objectStartPosition = new Point();
    private isSticky = false;
    private awaitingAction = false;
    private enableStickyClick:boolean|'desktop';

    private scene:Scene;
    private draggableContainer:Container;
    private onEndDrag:DragCallback;
    private onStickyOrClick:DragCallback;
    private onStartDrag:DragCallback;
    private onDragMove:DragCallback;

    private objects:Draggable[] = [];

    public bounds:Rectangle;


    constructor(scene:Scene, draggableContainer:Container, enableStickyClick:boolean|'desktop', dragBounds?:Rectangle, onStartDrag?:DragCallback, onEndDrag?:DragCallback, onStickyOrClick?:DragCallback, onDragMove?:DragCallback){
        this.scene = scene;
        this.draggableContainer = draggableContainer;
        this.enableStickyClick = enableStickyClick;
        this.bounds = dragBounds || this.draggableContainer.getBounds();
        this.onEndDrag = onEndDrag;
        this.onStickyOrClick = onStickyOrClick;
        this.onStartDrag = onStartDrag;
        this.onDragMove = onDragMove;
        this.scene.on('pointermove', this.mouseMove);
    }

    public addObject(object:Draggable, selectEvent?:FederatedPointerEvent){
        if(object.hitShape){
            object.hitShape.eventMode = 'static';
            object.hitShape.cursor = 'pointer';
            object.hitShape.on('pointerdown', this.draggableDown);
            object.hitShape.isHitShape = true;
            // If needed for LAP events:
            // this.scene.setupDwellTimer(object.hitShape, object.name || 'draggable_object');
        }
        else{
            object.eventMode = 'static';
            object.cursor = 'pointer';
            object.on('pointerdown', this.draggableDown);
            // If needed for LAP events:
            // this.scene.setupDwellTimer(object, object.name || 'draggable_object');
        }
        this.objects.push(object);
        if(selectEvent){
            this.selectObject(selectEvent, object);
        }
    }
    public removeObject(object:Draggable){
        if(object.hitShape){
            object.hitShape.eventMode = 'none';
            object.hitShape.cursor = 'normal';
            object.hitShape.off('pointerdown', this.draggableDown);
        }
        else{
            object.eventMode = 'none';
            object.cursor = 'normal';
            object.off('pointerdown', this.draggableDown);
        }
        const index = this.objects.indexOf(object);
        if(index >= 0){
            this.objects.splice(index, 1);
        }
        if(this.selectedObject === object){
            this.isSticky = false;
            this.selectedObject = null;
        }
    }

    private draggableDown = (ev:FederatedPointerEvent)=>{
        ev.data.originalEvent.preventDefault();
        if(!ev.data.isPrimary){
            return;
        }
        this.scene.off('pointerdown', this.draggableDown);
        let target = (ev.currentTarget as HitShape).isHitShape ? ev.currentTarget.parent : ev.currentTarget;
        if(this.selectedObject && this.selectedObject !== target){
            this.endDrag(ev);
        }
        else{
            this.selectObject(ev);
            
        }
    }

    private selectObject(ev:FederatedPointerEvent, object?:DisplayObject){
        this.selectedObject = (object || ((ev.currentTarget as HitShape).isHitShape ? ev.currentTarget.parent : ev.currentTarget)) as DisplayObject;
        if(!this.isSticky){
            this.awaitingAction = true;
            if(this.onStartDrag){
                this.onStartDrag(this.selectedObject, ev, this.isSticky);
            }
        }
        this.draggableContainer.addChild(this.selectedObject);
        ev.data.getLocalPosition(this.scene, this.dragStartPosition);
        this.objectStartPosition.copyFrom(this.selectedObject.position);
        this.scene.off('pointerup', this.draggableUp);
        this.scene.once('pointerup', this.draggableUp);
        this.scene.off('pointerupoutside', this.draggableUp);
        this.scene.once('pointerupoutside', this.draggableUp);
        this.updateMousePosition(ev);
    }
    
    private draggableUp = (ev:FederatedPointerEvent) => {
        ev.stopPropagation();
        this.scene.off('pointerupoutside', this.draggableUp);
        this.scene.off('pointerup', this.draggableUp);
        if(!ev.data.isPrimary){
            this.scene.once('pointerup', this.draggableUp);
            this.scene.once('pointerupoutside', this.draggableUp);
            return;
        }
        if(!this.selectedObject){
            this.updateMousePosition(ev);
            return;
        }
        if(this.awaitingAction){
            this.awaitingAction = false;
            const selectedObject = this.selectedObject;
            if(this.enableStickyClick === true || (this.enableStickyClick === 'desktop' && ev.data.pointerType !== 'pen' && ev.data.pointerType !== 'touch')){
                this.isSticky = true;
                this.scene.once('pointerdown', this.draggableDown);
                this.updateMousePosition(ev);
            }
            else{
                this.endDrag(ev);
            }
            if(this.onStickyOrClick){
                this.onStickyOrClick(selectedObject, ev, this.isSticky);
            }
        }
        else{
            this.endDrag(ev);
        }
    }

    private endDrag = (ev:FederatedPointerEvent) => {
        this.updateMousePosition(ev);
        this.update();
        if(this.onEndDrag){
            this.onEndDrag(this.selectedObject, ev, this.isSticky);
        }
        this.isSticky = false;
        this.selectedObject = null;
    }

    private mouseMove = (ev:FederatedPointerEvent) => {
        this.updateMousePosition(ev);
        if(this.selectedObject && this.onDragMove){
            this.onDragMove(this.selectedObject, ev, this.isSticky);
        }
    }

    private updateMousePosition = (ev:FederatedPointerEvent)=>{
        ev.data.originalEvent.preventDefault();
        if(!ev.data.isPrimary){
            return;
        }
        ev.data.getLocalPosition(this.scene, this.mousePosition);
        if(this.awaitingAction && (Math.abs(this.mousePosition.x - this.dragStartPosition.x) > MIN_DRAG || Math.abs(this.mousePosition.y - this.dragStartPosition.y) > MIN_DRAG)){
            this.awaitingAction = false;
        }
    }

    public update(){
        if(this.selectedObject){
            this.selectedObject.x = Math.min(this.bounds.right, Math.max(this.bounds.left, this.mousePosition.x + this.objectStartPosition.x - this.dragStartPosition.x));
            this.selectedObject.y = Math.min(this.bounds.bottom, Math.max(this.bounds.top, this.mousePosition.y + this.objectStartPosition.y - this.dragStartPosition.y));
        }
    }

    public destroy(){
        this.onEndDrag = null;
        this.onStickyOrClick = null;
        this.isSticky = false;
        this.selectedObject = null;
        for(let i = this.objects.length - 1; i >= 0; i--){
            this.removeObject(this.objects[i]);
        }
        this.scene.off('pointerup', this.draggableUp);
        this.scene.off('pointerupoutside', this.draggableUp);
        this.scene.off('pointerdown', this.draggableDown);
        this.scene.off('pointermove', this.mouseMove);
        this.scene = null;
        this.draggableContainer = null;
        this.mousePosition = null;
        this.dragStartPosition = null;
        this.objectStartPosition = null;
        this.objects = null;
    }
}

export type DragCallback = (object:DisplayObject, event:FederatedPointerEvent, isSticky:boolean)=>any;

export interface Draggable extends DisplayObject{
    hitShape?:HitShape;
}

export interface HitShape extends DisplayObject{
    isHitShape:boolean;
}