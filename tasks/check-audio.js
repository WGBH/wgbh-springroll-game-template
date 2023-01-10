const fs = require('fs');
let audioDirectory = process.env.npm_package_config_audioDirectory;
if (!audioDirectory) {
  console.log("no audio directory");
  return;
} else {
  console.log("audio directory: " + audioDirectory);
}
let voDirectory = ensureTrailingSlash(audioDirectory) + "vo/";
let musicDirectory = ensureTrailingSlash(audioDirectory) + "music/";
let sfxDirectory = ensureTrailingSlash(audioDirectory) + "sfx/";
if (!process.env.npm_package_config_directory) {
  console.log("no config directory!");
  return;
}
const configLocation = ensureTrailingSlash(process.env.npm_package_config_directory);
const outputLocation = configLocation + "captions.json";
let maxChars = process.env.npm_package_config_captionconf_maxChars ? process.env.npm_package_config_captionconf_maxChars : 80;
const syncfile = configLocation + "lipsync.json";
const dialogfile = configLocation + "dialog.json";
const audiofile = configLocation + "audio.json";
const { execSync } = require('child_process');



let usedVO;

console.log("\nChecking dialogs " + dialogfile);
try {
  let dialogconf = fs.readFileSync(dialogfile, 'utf8');
  dialogconf = JSON.parse(dialogconf.toString());
  let checkVO = getVOFromDialogs(dialogconf);
  console.log(checkVO.length);
  if (checkVO.length > 1) {
    usedVO = {};
    for (let vo in checkVO) {
      let ff = checkVO[vo];
      usedVO[ff] = true;
      if (!fs.existsSync(audioDirectory + ensureExtension(ff, 'mp3'))) {
        console.log("** No mp3 for line " + checkVO[vo]);
      }
    }
  }
} catch {
  console.log("** couldn't read dialog conf file");
}

let captionconfig;
console.log("Reading caption file " + outputLocation);
try {
  captionconfig = fs.readFileSync(outputLocation, 'utf8');
  captionconfig = JSON.parse(captionconfig.toString());
  for (var i in captionconfig) {
    let line = captionconfig[i];
    let checkedtime = false;
    for (let l = 0; l < line.length; l++) {
      if (line[l].content.length > maxChars) {
        console.log("** Long caption for line " + i + ": " + line[l].content.length + " chars");
      }
      if (!checkedtime && (line[l].end < 0 || line[l].start < 0 || line[l].retime)) {
        console.log("** Need timing for line " + i);
        checkedtime = true;
      }
    }

  }

  console.log("\nChecking VO against captions ");
  for (var i in captionconfig) {
    let checks = ["mp3"];
    let missing = [];
    for (let c in checks) {
      if (!fs.existsSync(voDirectory + ensureExtension(i, checks[c]))) {
        // console.log("** No ogg for line " + i);
        missing.push(checks[c]);
      }
    }

    if (missing.length > 0) {
      console.log("** Missing " + missing.join(',') + " for " + i);
    }
  }


  console.log("");

  let f = getAllFilenames(voDirectory);
  for (let v in f) {
    var fn = noExtension(f[v]);
    if (!captionconfig[fn]) {
      console.log("** Uncaptioned VO: " + f[v]);
    }

    if (usedVO && !usedVO[fn]) {
      console.log("? ** Unused audio? " + f[v]);
    }
  }


  console.log("\nChecking lipsync " + syncfile);
  let lipsync;
  try {
    let i;
    lipsync = fs.readFileSync(syncfile, 'utf8');
    lipsync = JSON.parse(lipsync.toString());
    for (i in captionconfig) {
      if (!lipsync[i]) {
        console.log("** Un-lipsynced: " + i);
      }
    }
    console.log("");
    for (i in lipsync) {
      if (!captionconfig[i]) {
        console.log("** Lipsynced w/o caption: " + i);
      }
    }
  } catch {
    console.log("** no lipsync file " + syncfile);
  }
} catch {
  console.log("");
  console.log("No existing json file configuration " + outputLocation);
}


console.log("\nChecking against audio config file " + audiofile);


try {
  // go through audio config, find all audio files
  // compare with all existing audio in sfx/vo/music directories
  let audioconf = fs.readFileSync(audiofile, 'utf8');
  audioconf = JSON.parse(audioconf.toString());
  console.log("** checking audio in sfx/ music/ and vo/ subdirectories");
  let checkAudio = getVOFromDialogs(audioconf);
  let usedAudio;
  if (checkAudio.length > 1) {
    usedAudio = {};
    for (let vo in checkAudio) {
      let ff = checkAudio[vo];
      usedAudio[ff] = true;
      if (!fs.existsSync(voDirectory + ensureExtension(ff, 'mp3')) && !fs.existsSync(sfxDirectory + ensureExtension(ff, 'mp3')) && !fs.existsSync(musicDirectory + ensureExtension(ff, 'mp3'))) {
        console.log("** No mp3 for audio '" + checkAudio[vo] + "'");
      }
    }
  }
  let f;
  try {
    f = getAllFilenames(voDirectory);
    for (let v in f) {
      var fn = noExtension(f[v]);
      if (usedAudio && !usedAudio[fn]) {
        console.log("? ** Unused VO? " + f[v]);
      }
    }
  } catch {
    console.log("no files in " + voDirectory);
  }
  try {
    f = getAllFilenames(sfxDirectory);
    console.log("filenames from sfx: " + f);
    for (let v in f) {
      var fn = noExtension(f[v]);
      if (usedAudio && !usedAudio[fn]) {
        console.log("? ** Unused SFX? " + f[v]);
      }
    }
  } catch {
    console.log("no files in " + sfxDirectory)
  }
  try {
    f = getAllFilenames(musicDirectory);
    console.log("filenames from music: " + f);
    for (let v in f) {
      var fn = noExtension(f[v]);
      if (usedAudio && !usedAudio[fn]) {
        console.log("? ** Unused music? " + f[v]);
      }
    }
  } catch {
    console.log("no files in " + musicDirectory);
  }
} catch {
  console.log("no audio info")
}

console.log("");

function getAllFilenames(path, fileextension) {
  const files = [];
  fs.readdirSync(path, { "withFileTypes": true }).forEach(file => {
    if (!file.isDirectory() && (!fileextension || file.name.indexOf(fileextension) > -1)) {
      var newname = file.name;//file.name.substr(0,file.name.indexOf(fileextension));
      files.push(newname);
    }
  })
  return files;
}


function ensureTrailingSlash(string) {
  if (!string) {
    console.warn("no input " + string);
    return string;
  }
  let newstring = string;
  if (!string.match(/\/$/)) {
    newstring += "/";
  }
  return newstring;
}

function ensureExtension(string, extension) {
  let newstring = string;
  extension = extension.replace(/^\./, "");
  var re = new RegExp('/\.' + extension + '$/', "g");
  if (!string.match(re)) {
    newstring += "." + extension;
  }
  return newstring;
}

function noExtension(string) {
  return string.replace(/\.\w{2,4}$/, "");
}

function stripTrailingReturn(string) {
  string = string.replace(/\n+$/, "");
  string = string.replace(/\r+$/, "");
  return string;
}

function getVOFromDialogs(dialognode) {
  let arr = [];
  drillDownDialog(dialognode, arr);
  return arr;
}

function drillDownDialog(dialognode, arr) {
  if (typeof dialognode === 'string') {
    if (arr.indexOf(dialognode) < 0) {
      arr.push(dialognode);
    }
    return;
  }
  for (let w in dialognode) {
    drillDownDialog(dialognode[w], arr);
  }
}