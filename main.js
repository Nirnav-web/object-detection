objects=[];
function preload(){
    img=loadImage("download(1).jpg");
}
img="";
status="";
function setup(){
    canvas=createCanvas(640,420);
    canvas.center();
    objectdetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status detecting objects";
}
function draw(){
    image(img,0,0,640,420);
    if(status!=""){
        for(i=0;i<objects.length;i++){
        document.getElementById("status").innerHTML="status: object detected";
        fill("red");
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
        noFill();
        stroke("red");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
    }
}
function modelLoaded(){
    console.log("model is loaded");
    status=true;
    objectdetector.detect(img,gotResult);
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