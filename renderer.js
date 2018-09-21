"use strict";
// This file is required by the main.js file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
let Gmail = require("./renderer/gmail").Gmail;
// load electron stuff
const {ipcRenderer} = require("electron");

// test outside the DOM-ready
ipcRenderer.on("open-keep", () => document.getElementById("gsc-gab-2").click());

// wait the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    //load jQuery & gmail
    const $ = require("jquery");
    var gmail = new Gmail(); 
  
    // detect Number of Inbox unread messages
    function unread_inbox_emails() {
        var dom = $("div[role=navigation]").find("[title*='" + gmail.tools.i18n("inbox") + "']");
        if(dom.length > 0) {
            if(dom[0].title.indexOf("(") !== -1) {
                return parseInt(dom[0].title.split(":")[0].replace(/[^0-9]/g, ""));
            }
        }

        return 0;
    }
    // build a round-robin-like solution
    function checkUnreads(period = 2000) {
        const unreads = unread_inbox_emails();
        ipcRenderer.send("badge", unreads);
        setTimeout(checkUnreads, period);
    }
    checkUnreads();
    
   //newGui = gmail.check.is_new_gui();
   //console.log(newGui);

    // compose new mail from Menu
    // new email func Gmail 2018 concept?
    // ipc.on("new-email", () => $(".T-I.J-J5-Ji.T-I-KE L3").click());
    ipcRenderer.on("new-email", function(e, arg){
        gmail.compose.start_compose();
    });

    
    // get the last access information
    // FIXME: is not working
        ipcRenderer.on("lastSessionIpc", function(e, arg){
        let gLast = gmail.get.last_active();
        gmail.tools.add_modal_window("Last session", "Ip: " + gLast.ip + "</br>Mac Address: " + gLast.mac + "</br>Time: " + gLast.time_relative, function(){
            gmail.tools.remove_modal_window();
        });
    });

    // FIXME: get the storage info
        ipcRenderer.on("storageIpc", function(e, arg){
        let gStor = gmail.get.storage_info();
        //console.log(gStor)
        gmail.tools.add_modal_window("Space Used", "Used: " + gStor.used + "</br>Total: " + gStor.total + "</br>Percent: " + gStor.percent, function(){ 
            gmail.tools.remove_modal_window(); 
        });
    }); 


    // ipc for Menu
    ipcRenderer.on("toggle-sidebar", () => $(".gb_hc").click());
    ipcRenderer.on("go-to-inbox", () => $(".TN.bzz.aHS-bnt").find("span:first").click());
    ipcRenderer.on("go-to-specials", () => $(".TN.bzz.aHS-bnw").find("span:first").click());
    ipcRenderer.on("go-to-reminders", () => $(".TN.bzz.aHS-bu1").find("span:first").click());
    ipcRenderer.on("go-to-important", () => $(".TN.bzz.aHS-bns").find("span:first").click());
    ipcRenderer.on("go-to-sent", () => $(".TN.bzz.aHS-bnu").find("span:first").click());
    ipcRenderer.on("go-to-sending", () => $(".TN.bzz.aHS-bzh").find("span:first").click());
    ipcRenderer.on("go-to-all", () => $(".TN.bzz.aHS-aHO").find("span:first").click());
    ipcRenderer.on("go-to-spam", () => $(".TN.bzz.aHS-bnv").find("span:first").click());
    ipcRenderer.on("go-to-draft", () => $(".TN.bzz.aHS-bnq").find("span:first").click());
    ipcRenderer.on("go-to-trash", () => $(".TN.bzz.aHS-bnx").find("span:first").click());
    ipcRenderer.on("sign-out", () => $("#gb_71").click());
    ipcRenderer.on("add-account", () => $(".gb_Fa.gb_Nf.gb_Ee.gb_Eb").click());
    ipcRenderer.on("refresh", () => $(".T-I.J-J5-Ji.nu.T-I-ax7.L3").click());    
    // gmail 2018 sidebar right
    ipcRenderer.on("open-calendar", () => $("#gsc-gab-6").click(function(){
        //$(this).attr("class", ".bse-bvF-I.bse-bvF-aLp.bse-bvF-I-KO");
        console.log("cal pressed");
    }));
    //ipcRenderer.on("open-keep", () => $("#gsc-gab-2").click());
    ipcRenderer.on("open-task", () => $("#gsc-gab-4").click());
    // setup menu
    ipcRenderer.on("open-settings", () => $("#ms").click());
    ipcRenderer.on("open-themes", () => $("#pbwc").click());

    $("#gsc-gab-6").on("click", "hover", function(){
        console.log("click or hover");
    });

});
