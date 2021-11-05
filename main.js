song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
volume = "";
speed = "";
score_left_wrist = 0;
score_right_wrist = 0;

function preload()
{
    song = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(450 , 450);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function modelLoaded()
{
    console.log("the model is loaded");
}

function draw()
{
    image(video , 0 , 0 , 450 , 450);
    fill("#FF0000");
    stroke("#FF0000");

    if(score_right_wrist > 0.2)
    {
        circle(rightWristX , rightWristY , 20);

        if(rightWristY > 0 && rightWristY <= 100)
        {
            document.getElementById("speed_value").innerHTML = "0.5x";
            song.rate(0.5);
        }
        
       else if(rightWristY > 100 && rightWristY <= 200)
        {
            document.getElementById("speed_value").innerHTML = "1x";
            song.rate(1);
        }
    
       else if(rightWristY > 200 && rightWristY <= 300)
        {
            document.getElementById("speed_value").innerHTML = "1.5x";
            song.rate(1.5);
        }
    
      else if(rightWristY > 300 && rightWristY <= 400)
        {
            document.getElementById("speed_value").innerHTML = "2x";
            song.rate(2);
        }
      else if(rightWristY > 400 && rightWristY <= 500)
      {
          document.getElementById("speed_value").innerHTML = "2.5x"
          song.rate(2.5);
      }
    }

    

    if(score_left_wrist > 0.2)
    {
        circle(leftWristX , leftWristY , 20);
        InNumberLeftWristY = Number(leftWristY);
        removed_decimal = floor(InNumberLeftWristY);
        volume = removed_decimal/500;
        document.getElementById("volume_value").innerHTML = volume;
        song.setVolume(volume);
    }

}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(2.5);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        score_left_wrist = results[0].pose.keypoints[9].score;
        score_right_wrist = results[0].pose.keypoints[10].score;
        console.log("score of the left wrist is " + score_left_wrist + "score of the right wrist is " + score_right_wrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
       

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}