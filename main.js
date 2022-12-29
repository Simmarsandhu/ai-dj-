leftwrist_score="";
song="";
leftwristx="";
leftwristy="";
rightwristx="";
rightwristy="";
rightWrist_score="";
function preload(){
 song=loadSound("music.mp3");

}

function setup(){
    canvas= createCanvas(500,500);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    pose_net=ml5.poseNet(video,modelLoaded);
    pose_net.on("pose",gotposes);


}
function gotposes(results){
    if (results.length >0){
        console.log(results);
        leftwristx=results[0].pose.leftWrist.x;
        rightwristx=results[0].pose.rightWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        rightwristy=results[0].pose.rightWrist.y;
        console.log("left wrist=" + leftwristx +"," + leftwristy);
        console.log("right wrist=" + rightwristx +"," + rightwristy);
        leftwrist_score=results[0].pose.keypoints[9].score;
        rightWrist_score=results[0].pose.keypoints[10].score;
        console.log(rightWrist_score);
        console.log(leftwrist_score);


    }
    
}
function modelLoaded(){
    console.log("modelloaded");
}
function draw(){
    image(video,0,0,500,500);
    
    fill("red");
    stroke("red");
    if(leftwrist_score > 0.2){
    circle(leftwristx,leftwristy,20);
    number_leftwristy =Number(leftwristy);
    leftwristy_update= floor(number_leftwristy);
    volume= leftwristy_update/500;
    document.getElementById("volume").innerHTML="volume = "+ volume;
    song.setVolume(volume);
    }
    if(rightWrist_score>0.2){
    circle(rightwristx,rightwristy,20);
    if(rightwristy>0 && rightwristy<=100){
        document.getElementById("speed").innerHTML="speed= 0.5x"
        song.rate(0.5);
    }
    else if(rightwristy>100 && rightwristy<=200){
        document.getElementById("speed").innerHTML="speed= 1x"
        song.rate(1);
    }
    else if(rightwristy>200 && rightwristy<=300){
        document.getElementById("speed").innerHTML="speed= 1.5x"
        song.rate(1.5);
    }
    else if(rightwristy>300 && rightwristy<=400){
        document.getElementById("speed").innerHTML="speed= 2x"
        song.rate(2);
    }
    else if(rightwristy>400 && rightwristy<=500){
        document.getElementById("speed").innerHTML="speed= 2.5x"
        song.rate(2.5);
    }
}
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);

}


