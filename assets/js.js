const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const heading = $('header h3')
const sin = $('.author')
const cdThumb = $('.control-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('.progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: 'Em của ngày hôm qua',
            singer: 'MTP',
            path: '../assets/music/EmCuaNgayHomQua-SonTungMTP-2882720.mp3',
            image: '../assets/img/son-tung-mtp.jpg'
        },
        {
            name: 'FLOWER',
            singer: 'Jisoo',
            path: '../assets/music/Flower-JISOO-8949069.mp3',
            image: '../assets/img/JS.jpg'
        },
        {
            name: 'Không thể say',
            singer: 'HIEUTHUHAI',
            path: '../assets/music/KhongTheSay-HIEUTHUHAI-9293024.mp3',
            image: '../assets/img/KTS.jpg'
        },
        {
            name: 'LikeCrary',
            singer: 'Jimin',
            path: '../assets/music/LikeCrazy-JiminBTS-8899920.mp3',
            image: '../assets/img/jm.webp'
        },
        {
            name: 'ShutDown',
            singer: 'BlackPink',
            path: '../assets/music/ShutDown-BLACKPINK-7887142.mp3',
            image: '../assets/img/lb.jpg'
        },
        {
            name: 'Gone',
            singer: 'Rosé',
            path: '../assets/music/Gone-ROSE-6964052.mp3',
            image: '../assets/img/ro.jpg'
        }
    ],
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                    <div class="song-playlist">
                        <div class="thumb">
                            <img src="${song.image}" alt="" width="60px" height="60px">
                        </div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        playlist.innerHTML = htmls.join('')
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function () {
        const _this = this

        // Xử lí CD quay / dừng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000, //10 seconds
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        // Xử lí khi click play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        // Khi song được play
        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }

        // Khi song bị pause
        audio.onpause = function () {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }

        // Xử lí khi tua song
        progress.oninput = function (e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }

        // Khi next song
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // Khi prev song
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
        }

        // Khi bật tắt random song
        randomBtn.onclick = function (e) {
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        // Lặp lại bài hát
        repeatBtn.onclick = function (e) {
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        // Xử lí next song khi audio ended
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }

        // Lắng nghe click vào playlist
        playlist.onclick = function (e) {
            // Xử lí khi click vào song
            const songNode = e.target.closest('.song:not(.active)')
            if(songNode || e.target.closest('.option')) {
                
                if(songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrenSong()
                    _this.render()
                    audio.play()
                }

            }
        }
    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            })
        }, 500)
    },
    loadCurrenSong: function () {
        heading.textContent = this.currentSong.name
        sin.textContent = this.currentSong.singer
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrenSong()
    },
    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrenSong()
    },
    playRandomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrenSong()
    },
    start: function () {
        // Định nghĩa các thuộc tính cho Object
        this.defineProperties()

        // Lắng nghe, xử lí các sự kiện
        this.handleEvents()

        // Tải thông tin bài hát đầu tiên khi chạy ứng dụng
        this.loadCurrenSong()

        // Render playlist
        this.render()
    }
}

app.start()