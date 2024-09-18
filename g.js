let W = window.innerWidth;
        let H = window.innerHeight;
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");
        const maxConfettis = 150;
        const particles = [];

        const possibleColors = [
            "DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue",
            "LightBlue", "Gold", "Violet", "PaleGreen", "SteelBlue",
            "SandyBrown", "Chocolate", "Crimson"
        ];

        function randomFromTo(from, to) {
            return Math.floor(Math.random() * (to - from + 1) + from);
        }

        function confettiParticle() {
            this.x = Math.random() * W;
            this.y = Math.random() * H - H;
            this.r = randomFromTo(11, 33);
            this.d = Math.random() * maxConfettis + 11;
            this.color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
            this.tilt = Math.floor(Math.random() * 33) - 11;
            this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
            this.tiltAngle = 0;

            this.draw = function() {
                context.beginPath();
                context.lineWidth = this.r / 2;
                context.strokeStyle = this.color;
                context.moveTo(this.x + this.tilt + this.r / 3, this.y);
                context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
                return context.stroke();
            };
        }

        function Draw() {
            requestAnimationFrame(Draw);
            context.clearRect(0, 0, W, window.innerHeight);

            particles.forEach(particle => {
                particle.draw();
                particle.tiltAngle += particle.tiltAngleIncremental;
                particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
                particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

                if (particle.y <= H) remainingFlakes++;
                if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
                    particle.x = Math.random() * W;
                    particle.y = -30;
                    particle.tilt = Math.floor(Math.random() * 10) - 20;
                }
            });
        }

        window.addEventListener("resize", function() {
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }, false);

        for (var i = 0; i < maxConfettis; i++) {
            particles.push(new confettiParticle());
        }

        canvas.width = W;
        canvas.height = H;

        let boxes = document.querySelectorAll(".box");
        let new1 = document.querySelector(".new");
        let winnerDisplay = document.getElementById("winner");
        let turno = true;

        const winning = [
            [0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,5,8],
            [2,4,6], [3,4,5], [6,7,8]
        ];

        boxes.forEach((box) => {
            box.addEventListener("click", () => {
                if (turno) {
                    box.innerText = "O";
                    turno = false;
                } else {
                    box.innerText = "X";
                    turno = true;
                }
                box.disabled = true;
                checkWinner();
            });
        });

        const checkWinner = () => {
            for (let i of winning) {
                let pos1 = boxes[i[0]].innerText;
                let pos2 = boxes[i[1]].innerText;
                let pos3 = boxes[i[2]].innerText;

                if (pos1 !== "" && pos2 !== "" && pos3 !== "" && pos1 === pos2 && pos2 === pos3) {
                    console.log("winner: " + pos1);
                    winnerDisplay.innerText = `Winner: ${pos1}`;
                    winnerDisplay.classList.add("winner"); 
                    document.body.style.backgroundColor = "green";
                    canvas.style.display = "block";
                    Draw(); 
                    return;
                }
            }
        };

        new1.addEventListener("click", function() {
            boxes.forEach((box) => {
                box.innerText = "";
                box.disabled = false;
            });
            document.body.style.backgroundColor = "cornflowerblue";
            canvas.style.display = "none";
            winnerDisplay.innerText = ""; 
            winnerDisplay.classList.remove("winner"); 
        });


