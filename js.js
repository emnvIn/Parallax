const parallax_el = document.querySelectorAll('.parallax');

let xValue = 0,
yValue = 0;

let rotateDegree =  0;

//css에 transform -50-50 안넣고 모든 이미지 제자리에 놓기위해 만든 함수
//css에 해도 되는데 새로고침하고 마우스 처음 움직이면 뚝 끊기고 이미지 반응
//이 함수를 쓰면 끊기지는 않는데, 처음 등장할때 함수 적용되기 전 밀린 자리에서 등장함
function update(cursurPosition) {
    parallax_el.forEach((el) => {//아래 안빼면 이미지들 위치가 망가짐
        let speedx = el.dataset.speedx; //각 요소들이 다 다른 속도여서 안에다 써주기
        let speedy = el.dataset.speedy;
        let speedz = el.dataset.speedz;
        let rotateSpeed = el.dataset.rotation;
        
        //const forTest = document.querySelector(".mountain_2"); 테스트로 사진에서 왼쪽으로 갈 때 -뜨는지 확인 아래에 translateZ(${zValue}px)를 0으로 하기
        
        let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
        //화면 사이즈를 절반으로 나누고 맞는 지 확인 위에 식으로 위치 확인한후 적용 

        let zValue = 
        (cursurPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.11;
        //이미지 가까워지고 멀어지기위해 선언
        //console.log(zValue);


        el.style.transform = 
        `translateX(calc(-50% + ${-xValue * speedx}px)) 
        translateY(calc(-50% + ${yValue * speedy}px))
        perspective(2300px) translateZ(${zValue * speedz}px)
        rotateX(${rotateDegree}deg) rotateY(${rotateDegree * rotateSpeed}deg)`;
    });//각 이미지 위치를 잡고, 움직이는 방향을 xValue로 맞추고 스피드를 speedx로 조절해놓은 것에 맞춤
}

update(0);

window.addEventListener("mousemove", (e) => {
    xValue = e.clientX - window.innerWidth / 2; //기준을 화면의 왼쪽 상단에서 중앙으로 바꿈
    yValue = e.clientY - window.innerHeight / 2;

    rotateDegree = (xValue / (window.innerWidth / 2)) * 20;//-20와 20 사이에서만 나타남
    //console.log(rotateDegree);
    //절반으로 나눈 화면 왼쪽 (1) 오른쪽(-1)에서 마우스가 중앙에서 얼마나 떨어졌는지 계산

    update(e.clientX);
});