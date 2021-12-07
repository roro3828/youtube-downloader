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
    let download_menu=document.createElement('ul');

    download_menu.innerHTML="<li>\
    <a href='youtube-dl://video?"+getParam('v')+"'>動画をダウンロード</a>\
        <ul>\
            <li>\
                <a href='youtube-dl://audio?"+getParam('v')+"'>音声をダウンロード</a>\
            </li>\
        </ul>\
    </li>"
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