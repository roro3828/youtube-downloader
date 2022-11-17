function main(){
    const timer=setInterval(loaded,10);
    function loaded(){
        if(document.getElementsByClassName("ytp-title-link yt-uix-sessionlink")[0]!=null){
            clearInterval(timer);
            when_loaded();
            //window.alert("test");
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
    let menu=document.getElementsByClassName("middle-controls style-scope ytmusic-player-bar")[0];
    let link=document.getElementsByClassName("ytp-title-link yt-uix-sessionlink")[0];
    console.log("aaaaaaaaaaaa");
    
    //const theme=document.getElementByName('theme-color').getAttribute("content");
    let color="#FFFFFF";
    //let video_id=getParam("v",document.getElementsByClassName("ytp-title-link yt-uix-sessionlink")[0].getAttribute("href"));
    //window.alert(link.href);

    if(document.getElementsByClassName("download-menu")[0]==null){
        let download_menu=document.createElement('ul');
        download_menu.className="download-menu";
        download_menu.innerHTML="<div>\
            <a onclick='window.open(\"youtube-dl://audio?"+getParam('v',link.href)+"\",\"subwin\",\"width=1,height=1\");' class='download-button'>曲をダウンロード</a>\
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
            </style>";
        download_menu.style="box-sizing: border-box;";
        menu.appendChild(download_menu);
    }
    else{
        //document.getElementsByClassName("download-button")[0].onclick="window.open(\"youtube-dl://audio?"+getParam('v',link.href)+"\",\"subwin\",\"width=1,height=1\");";
        document.getElementsByClassName("download-button")[0].setAttribute("onclick","window.open(\"youtube-dl://audio?"+getParam('v',link.href)+"\",\"subwin\",\"width=1,height=1\");");
    }

    let config={
        attributes:true
    }
    observer.observe(link,config);
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