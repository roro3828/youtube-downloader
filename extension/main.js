function main(){
    const timer=setInterval(loaded,10);
    function loaded(){
        if(document.getElementById('menu-container').querySelector('#top-level-buttons-computed')!=null){
            clearInterval(timer);
            when_loaded();
        }
    }
}

function when_loaded(){
    let menu=document.getElementById('menu-container').querySelector('#top-level-buttons-computed');
    let download_button=document.createElement('button');
    download_button.type="button";
    download_button.setAttribute('onclick',"location.href='youtube-dl:"+getParam('v')+"'");
    download_button.innerHTML="動画をダウンロード";
    menu.appendChild(download_button);
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