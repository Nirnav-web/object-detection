objects=[];
function preload(){
}
img="";
status="";
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectdetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status detecting objects";
}
function draw(){
    image(video,0,0,380,380);
    if(status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectdetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
        document.getElementById("status").innerHTML="status: object detected";
        document.getElementById("number_of_objects").innerHTML="number of objects detected are: "+objects.length
        fill(r,g,b);
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
    }
}
function modelLoaded(){
    console.log("model is loaded");
    status=true;
}
function gotResult(error,results){
    if(error){
        console.log(error)
    }
    else{
    console.log(results);
    objects=results;
}
}