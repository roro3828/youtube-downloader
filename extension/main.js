function menu_remove(){
    var menu=document.getElementById('menu-container').querySelector('#top-level-buttons-computed');
    var download_button=document.createElement('button');
    download_button.type="button";
    download_button.setAttribute('onclick',"location.href='youtube-dl:"+getParam('v')+"'");
    menu.insertBefore(download_button,menu.firstChild);
}

function main(e){
    const timer=setInterval(jsloaded,10);
    function jsloaded(){
        if(document.querySelector('#menu-container')!=null){
            clearInterval(timer);
            menu_remove();
            wait();
        }
    }
}

function wait(){
    var id=getParam('v');
    var timer=setInterval(wait_until_change,1000);
    function wait_until_change(){
        if(id!=getParam('v')){
            clearInterval(timer);
            main();
        }
    }
}

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

window.addEventListener("load",main,false);