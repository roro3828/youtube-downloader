function main(){
    const timer=setInterval(loaded,10);
    function loaded(){
        if(document.getElementById('menu-container').querySelector('#top-level-buttons-computed')!=null){
            clearInterval(timer);
            when_loaded();
        }
    }
}

function change_color(){
    const theme=document.getElementsByName('theme-color')[0].getAttribute("content");
    let color="#FFFFFF";
    if(theme=="rgba(255,255,255,0.98)"){
        color="#000000";
    }
}

function when_loaded(){
    let menu=document.getElementById('menu-container').querySelector('#top-level-buttons-computed');
    let download_menu=document.createElement('ul');
    const theme=document.getElementsByName('theme-color')[0].getAttribute("content");
    let color="#FFFFFF";
    if(theme=="rgba(255,255,255,0.98)"){
        color="#000000";
    }

    download_menu.innerHTML="<div>\
        <a href='youtube-dl://video?"+getParam('v')+"' class='download-button'>動画をダウンロード</a>\
        <br>\
        <a href='youtube-dl://audio?"+getParam('v')+"' class='download-button'>音声をダウンロード</a>\
    </div>\
    <style>\
    .download-button{\
        text-decoration:none;\
        color:"+color+";\
        white-space:nowrap\
    }\
    .download-button:hover{\
        color:#bdbdbd\
    }\
    </style>"
    download_menu.style="box-sizing: border-box;"

    menu.appendChild(download_menu);
    let config={
        childList:true
    }
    observer.observe(menu,config);
}
const observer=new MutationObserver(
    function(){
        main();
        observer.disconnect();
    }
)
main();


function getParam(name,url){
    if(!url){
    url = window.location.href;
    }
    name=name.replace(/[\[\]]/g,"\\$&");
    var regex=new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}