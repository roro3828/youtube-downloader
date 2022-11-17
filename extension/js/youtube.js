//ページが読み込まれるまで待機
function main(){
    suggest_observer.disconnect();
    const timer=setInterval(loaded,10);
    function loaded(){
        if(document.querySelector("ytd-watch-metadata")!=null){
            clearInterval(timer);
            //読み込まれたら実行
            when_loaded();
        }
    }
}

//ライトテーマならtrueを返す
function is_theme_light(){
    let theme=document.querySelector('meta[name="theme-color"]').getAttribute("content");

    return theme=="rgba(255, 255, 255, 0.98)";
}

//読み込まれたら実行
function when_loaded(){
    let metadata=document.querySelector("ytd-watch-metadata");
    //window.alert(metadata.getAttribute("video-id"));

    //メニュー(...を押したときに出てくるやつ)を取得
    let menu=metadata.querySelector("ytd-menu-renderer");
    //なかった場合出現させるボタンをダブルクリックして生成
    if(menu!=null){
        let option_button=menu.querySelector('yt-button-shape[version]');
        option_button.querySelector("button").click();
        option_button.querySelector("button").click();
        option_button.addEventListener("click",menu_button_click);
    }

    //関連動画欄が読み込まれるまで待機
    const timer=setInterval(loaded,10);
    function loaded(){
        if(document.querySelector("ytd-item-section-renderer.ytd-watch-next-secondary-results-renderer")!=null){
            clearInterval(timer);
            let contents=document.querySelector("ytd-item-section-renderer.ytd-watch-next-secondary-results-renderer").querySelector("#contents");

            suggest_observer.observe(contents,{childList:true});
        }
    }

    observer.observe(metadata,{attributes:true});
}

//関連動画
function suggest_videos(){
    let contents=document.querySelector("ytd-item-section-renderer.ytd-watch-next-secondary-results-renderer").querySelector("#contents");
    if(contents!=null){
        let videos=contents.querySelectorAll("ytd-compact-video-renderer");
        for(let i=0;i<videos.length;i++){
            let video_data=videos[i].querySelector("div.details");
            if(videos[i].getAttribute("button_set")==null){
                videos[i].setAttribute("button_set",true);
                video_data.querySelector("yt-icon-button").addEventListener("click",menu_button_click);
            }
        }
    }
}

const observer=new MutationObserver(
    function(){
        main();
        observer.disconnect();
    }
)

const suggest_observer=new MutationObserver(
    function(){
        suggest_videos();
    }
)
main();

//...ボタンを押したとき実行
function menu_button_click(){
    //ダウンロードする動画のid
    let video_id=getParam("v");
    if(this.tagName.toLowerCase()=="yt-icon-button"){
        video_id=getParam("v",this.parentNode.parentNode.parentNode.querySelector("a").href);
    }

    //メニュー(...を押したときに出てくるやつ)を取得
    let popup_renderer=document.querySelector("ytd-menu-popup-renderer");

    //ダウンロードボタンが存在しなければ生成
    if(popup_renderer.querySelector(".youtube_download_button")==null){

        //ダークモードかライトモードか
        let theme;
        if(is_theme_light()){
            theme="light";
        }
        else{
            theme="dark";
        }

        //ダウンロードボタン生成
        let download_button=document.createElement("button");
        download_button.className="youtube_download_button "+theme;
        download_button.innerText="ダウンロード";
        download_button.value="ダウンロード";
        download_button.setAttribute("video_id",video_id);
        download_button.addEventListener("click",download_button_click("video"),true);
        popup_renderer.appendChild(download_button);

        let audio_download=document.createElement("button");
        audio_download.className="youtube_download_button "+theme;
        audio_download.innerText="音声のみ";
        audio_download.value="ダウンロード";
        audio_download.setAttribute("video_id",video_id);
        audio_download.addEventListener("click",download_button_click("audio"),true);
        popup_renderer.appendChild(audio_download);
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
        location.href="youtube-dl://"+mode+"?"+video_id;
        
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