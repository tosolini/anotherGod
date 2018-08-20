// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// load electron lib
const {webFrame, ipcRenderer, remote} = require('electron');
const main = remote.require('./main.js'); 


//document.addEventListener("DOMContentLoaded", function(event) {
document.addEventListener('DOMContentLoaded', () => {   
    //load jQuery & gmail
    const $ = require('jquery');
    const Gmail = require('gmail-js').Gmail;
    const gmail = new Gmail(); 

    // wait loading gmail interface
    gmail.observe.on('load', function(xhr){
        let unread = gmail.get.unread_inbox_emails();
        ipcRenderer.send('async', unread); 
    });
    // check new mail
    gmail.observe.on('new_email', function() {
        let unread = gmail.get.unread_inbox_emails();
        ipcRenderer.send('async', unread);
      });
    // check in poll mode
    gmail.observe.on('poll', function(data){
        let unread = gmail.get.unread_inbox_emails();
        ipcRenderer.send('async', unread);
    });
    // check after reading mail
    gmail.observe.on('read', function(){
        let unread = gmail.get.unread_inbox_emails();
        ipcRenderer.send('async', unread);
    });
    // check after set unread status of mail
    gmail.observe.on('unread', function(){
        let unread = gmail.get.unread_inbox_emails();
        ipcRenderer.send('async', unread);
    });
    // check after delete mail(s)
    gmail.observe.on('delete', function(){
        let unread = gmail.get.unread_inbox_emails();
        ipcRenderer.send('async', unread);
    });    

    // listen from Menu to execute action
    ipcRenderer.on('newMailIpc', function(e, arg){
        gmail.compose.start_compose();
    });

    // compose new mail from Menu
    // TODO: find a solution for this
    gmail.observe.on('open_email', function(id, url, body, xhr) {
        //console.log(gmail.tools.extract_email_address(str));
      });
    
    // get the last access information
    // FIXME: is not working
    ipcRenderer.on('lastSessionIpc', function(e, arg){
        let gLast = gmail.get.last_active();
        gmail.tools.add_modal_window('Last session', 'Ip: ' + gLast.ip + '</br>Mac Address: ' + gLast.mac + '</br>Time: ' + gLast.time_relative, function(){
            gmail.tools.remove_modal_window();
        });
    });

    // get the storage info
    ipcRenderer.on('storageIpc', function(e, arg){
        let gStor = gmail.get.storage_info();
        //console.log(gStor)
        gmail.tools.add_modal_window('Space Used', 'Used: ' + gStor.used + '</br>Total: ' + gStor.total + '</br>Percent: ' + gStor.percent, function(){ 
            gmail.tools.remove_modal_window(); 
        });
    });

}, false);



  
