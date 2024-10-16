var containers = document.querySelectorAll('.container');
        var popup = document.getElementById('popup');
        var popupContent = document.getElementById('popup-content');
        var closePopupButton = document.getElementById('close-popup');
        var picture = document.getElementById('picture');
        var backdrop = document.getElementById('backdrop');
        var player = document.getElementById('player');
        var playerd;

        function onYouTubeIframeAPIReady() {
            playerd = new YT.Player('player', {
                height: '450px',
                width: '600px',
                videoId: '', // 기본적으로 빈 값으로 설정
                events: {
                    'onReady': function(event) {
                        event.target.playVideo(); // 비디오 자동 재생
                    }
                }
            });
        }

        containers.forEach(function(container) {
            var overlay = container.querySelector('.overlay');

            container.addEventListener('mousemove', function(e) {
                var x = e.offsetX;
                var y = e.offsetY;
                var rotateY = -1 / 5 * x + 20;
                var rotateX = 4 / 30 * y - 20;

                overlay.style = `background-position : ${x / 5 + y / 5}%`;
                container.style = `transform : perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

                // 오버레이 애니메이션 시작
                overlay.style.filter = 'opacity(1)';
            });

            container.addEventListener('mouseout', function() {
                container.style = 'transform : perspective(350px) rotateY(0deg) rotateX(0deg)';
                overlay.style.filter = 'opacity(0)';
            });

            container.addEventListener('click', function() {
                var labelText = container.querySelector('.label').innerHTML; // .label의 내용을 가져옴
                popupContent.innerHTML = labelText; // 팝업에 내용 넣기

                // 제목 설정 (각 카드 ID에 따라 다르게 설정)
                var titleMap = {
                    'godot': '고도가 말한다',
                    'naruhodo': '나루호도가 말한다',
                    'mizzrugi': '미츠루기가 말한다',
                    'mayoi': '마요이가 말한다',
                    'karma': '메이가 말한다',
                    'chihiro': '치히로가 말한다',
                    'ito' : '이토노코가 말한다',
                    'harumi' : '하루미가 말한다',
                    'texas' : '자이몬이 말한다',
                    'yahari' : '야하리가 말한다',
                    'ganto' : '간토 청장이 말한다',
                    'decision' : '재판장이 말한다'
                };

                var imageMap = {
                    'godot': 'gdot.gif',
                    'naruhodo': 'naruhodo.gif',
                    'mizzrugi': 'mizzrugi.gif',
                    'mayoi': 'mayoi2.png',
                    'karma': 'karma.gif',
                    'chihiro': 'chihiro.gif',
                    'ito' : 'ito.webp',
                    'harumi' : 'harumi.webp',
                    'texas' : 'texas.webp',
                    'yahari' : 'yahari.webp',
                    'ganto' : 'ganto.webp',
                    'decision' : 'decision.webp'
                };

                var videoMap = {
                    'godot' : 'YKnE5EJF6yU',
                    'naruhodo' : 'ybABUTgBXGU',
                    'mizzrugi' : 'ZO0ltA58KdQ',
                    'mayoi' : 'asP9caUQp9E',
                    'karma' : 'WlqpbJr3vfE',
                    'chihiro' : 'J3ZpQctjyXQ',
                    'ito' : 'aGUN5Rrm_uk',
                    'harumi' : 'uk7NkTT2zN8',
                    'texas' : 'GDmTSS3XpHs',
                    'yahari' : 'G3nqpasJudI',
                    'ganto' : 'QaEtDQgNmow',
                    'decision' : '5bjiGTrR4P0'
                };

                var title = titleMap[container.id]; // 카드 ID에 맞는 제목 가져오기
                document.getElementById('popup-title').textContent = title; // 제목 설정

                var imageSrc = imageMap[container.id];
                picture.style.backgroundImage = `url(${imageSrc})`;

                var videoId = videoMap[container.id]; // 카드 ID에 따라 비디오 ID 설정
                playerd.loadVideoById(videoId); // 비디오 로드

                popup.style.display = 'block'; // 팝업 열기
                picture.style.display = 'block';
                backdrop.style.display = 'block';
            });

            var isFliped = false;
            document.getElementById('flipButton').addEventListener('click', function() {
                var popupimg = document.querySelector('#picture');

                if(isFliped){
                    popupimg.style.transform = 'scaleX(1)';
                } else {
                    popupimg.style.transform = 'scaleX(-1)'; 
                }

                isFliped = !isFliped;
            });

            // 닫기 버튼 클릭 시 팝업 닫기
            closePopupButton.addEventListener('click', function() {
                popup.style.display = 'none';
                picture.style.display = 'none';
                backdrop.style.display = 'none';
                playerd.stopVideo();
            });

        });