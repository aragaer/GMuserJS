// ==UserScript==
// @name          Emoji remover
// @description   Script that removes emojis and stickers at https://vk.com
// @namespace     https://github.com/0xCA/GMuserJS
// @downloadURL   https://github.com/0xCA/GMuserJS/raw/master/vkEmojiRemover/EmojiRemover.user.js
// @updateURL     https://github.com/0xCA/GMuserJS/raw/master/vkEmojiRemover/EmojiRemover.user.js
// @include       https://vk.com/*
// @include       http://vk.com/*
// @version       2.3.58
// @author        https://github.com/0xCA
// @grant         none
// ==/UserScript==

////////////////////////////////////////////////////////////////
// Vars
////////////////////////////////////////////////////////////////

// Overtrigger prevention var
scrollTriggerBlock = false;

////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////
// Triggers
////////////////////////////////////////////////////////////////

// React on load
window.onload = function() {
  
    FSInit();
  
  
    // Automatically remove confirmation box and ads
    if (document.getElementById("actualize_box")) {
        var id = ["box_layer_bg", "box_layer_wrap"];
        id.forEach(removeElementById);
    }
    
    removeElementById("ads_left");
  
};


// React on any scroll
window.onscroll = function () {
    if (!scrollTriggerBlock) {
        scrollTriggerBlock = true;
        setTimeout(function(){
            scrollTriggerBlock = false;
        }, 500); // Prevent massive reaction on smooth scroll, leave only first one every 500 ms
      
        FSInit();
    }
} 


// React on any click
document.body.addEventListener('mouseup', function(){
    FSInit();
  
    setTimeout(function(){
        FSInit();
        removeElementById("ads_left");
    }, 1500); // Remove anything after AJAX-navigation
});


// React on enter
document.body.addEventListener('keyup', function(e) {
    if(e.keyCode === 13) {
        FSInit();
    }
});

////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////
// Actions
////////////////////////////////////////////////////////////////

// Filtering scanner
function FSInit() {
    var className = ["emoji", "emoji_css", "sticker_img", "emoji_smile_cont", "emoji_smile_cont ", "emoji_list", "emoji_smile fl_l", "im_sticker_row"];
    className.forEach(removeElementsByClassName);
}



// Removing functions themselves
function removeElementById(id) {
    var child = document.getElementById(id);
    if (child) {
        child.parentElement.removeChild(child);
    }
}

function removeElementsByClassName(className) {
    var elementsList = document.getElementsByClassName(className);

    while (elementsList.length != 0) {
        for (var i = 0; i < elementsList.length; i++) {
            child = elementsList[i];
            child.parentElement.removeChild(child);
        }
    }
}

////////////////////////////////////////////////////////////////
