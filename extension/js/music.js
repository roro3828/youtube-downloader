function main(){
    const timer=setInterval(loaded,10);
    function loaded(){
        if(document.querySelector(".ytp-title-link")!=null){
            clearInterval(timer);
            when_loaded();
            //window.alert("test");
        }
    }
}

function when_loaded(){
    let link=document.querySelector(".ytp-title-link");
    let menu=document.querySelector("ytmusic-player-bar");

    const timer=setInterval(loaded,10);
    function loaded(){
        if(menu.querySelector("tp-yt-paper-icon-button.ytmusic-menu-renderer")!=null){
            clearInterval(timer);
            wait_for_button();
            //window.alert("test");
        }
    }

    observer.observe(link,{attributes:true});
}
const observer=new MutationObserver(
    function(){
        main();
        observer.disconnect();
    }
)

function wait_for_button(){
    let option_button=document.querySelector("ytmusic-player-bar").querySelector("tp-yt-paper-icon-button.ytmusic-menu-renderer");
    if(option_button!=null){
        option_button.click();
        option_button.click();
        option_button.addEventListener("click",menu_button_click);
    }
}

//...ボタンを押したとき実行
function menu_button_click(){
    //ダウンロードする動画のid
    let video_id=getParam("v",document.querySelector(".ytp-title-link").href);

    //メニュー(...を押したときに出てくるやつ)を取得
    let popup_renderer=document.querySelector("ytmusic-menu-popup-renderer");

    //ダウンロードボタンが存在しなければ生成
    if(popup_renderer.querySelector(".youtube_download_button")==null){

        //ダウンロードボタン生成
        let audio_download=document.createElement("button");
        audio_download.className="youtube_download_button dark youtube_music";
        audio_download.innerText="ダウンロード";
        audio_download.value="ダウンロード";
        audio_download.setAttribute("video_id",video_id);
        audio_download.addEventListener("click",download_button_click("audio"),true);
        popup_renderer.querySelector("tp-yt-paper-listbox").appendChild(audio_download);
    }
    //ダウンロードボタンが存在していればダウンロードする動画のidを更新
    else{
        let buttons=popup_renderer.querySelectorAll(".youtube_download_button");
        for(let i=0;i<buttons.length;i++){
            buttons[i].setAttribute("video_id",video_id);
        }
    }
}

//ダウンロードボタンが押されたときに実行
function download_button_click(mode){
    return function(ev){
        let video_id=document.querySelector(".youtube_download_button").getAttribute("video_id");
        //メニューを閉じる
        document.body.click();
        window.open("youtube-dl://"+mode+"?"+video_id);
        
    }
}
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