function main(){
    const timer=setInterval(loaded,10);
    function loaded(){
        if(document.querySelector("ytd-watch-metadata")!=null){
            clearInterval(timer);
            when_loaded();
        }
    }
}

function is_theme_light(){
    var theme=document.querySelector('meta[name="theme-color"]').getAttribute("content");

    return theme=="rgba(255, 255, 255, 0.98)";
}

function when_loaded(){
    var metadata=document.querySelector("ytd-watch-metadata");
    //window.alert(metadata.getAttribute("video-id"));

    if(document.querySelector("ytd-menu-popup-renderer")!=null){
        var popup=document.querySelector("ytd-menu-popup-renderer");
        
    }

    //ボタンが存在するか
    if(document.querySelector("#button-shape > button")!=null){
        let b=document.querySelector("#button-shape > button");
        b.click();
        b.click();
        let popup_renderer=document.querySelector("ytd-menu-popup-renderer");
        if(popup_renderer.querySelector(".youtube_download_button")==null){
            let download_button=document.createElement("button");
            download_button.className="youtube_download_button";
            download_button.innerText="ダウンロード";
            download_button.value="ダウンロード";
            download_button.addEventListener("click",download_button_click("video"),true);
            popup_renderer.appendChild(download_button);

            let audio_download=document.createElement("button");
            audio_download.className="youtube_download_button";
            audio_download.innerText="音声のみダウンロード";
            audio_download.value="ダウンロード";
            audio_download.addEventListener("click",download_button_click("audio"),true);
            popup_renderer.appendChild(audio_download);
        }
    }

    //メタデータが変更されたら実行
    observer.observe(metadata,{attributeFilter:["video-id"]});
}
const observer=new MutationObserver(
    function(){
        main();
        observer.disconnect();
    }
)
main();

function download_button_click(mode){
    return function(ev){
        document.querySelector("#button-shape > button").click();
        location.href="youtube-dl://"+mode+"?"+getParam("v");
        
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