const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const heading = $('header h3')
const sin = $('.author')
const cdThumb = $('.control-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const playBtn_header = $('.btn__button')
const play_title = $('.title')
const player = $('.player')
const progress = $('.progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')
const firstTime = $('.first-time')
const lastTime = $('.last-time')


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: 'Theres No One At All',
            singer: 'Sơn Tùng MTP',
            path: '../assets/music/TheresNoOneAtAll-SonTungMTP-7583837.mp3',
            image: '../assets/img/mikey1.jpg',
            time: '02:52'
        },
        {
            name: 'FLOWER',
            singer: 'Jisoo',
            path: '../assets/music/Flower-JISOO-8949069.mp3',
            image: '../assets/img/JS.jpg',
            time: '02:54'
        },
        {
            name: 'Không thể say',
            singer: 'HIEUTHUHAI',
            path: '../assets/music/KhongTheSay-HIEUTHUHAI-9293024.mp3',
            image: '../assets/img/zoro1.jpg',
            time: '03:48'

        },
        {
            name: 'Waiting For You',
            singer: 'Mono',
            path: '../assets/music/WaitingForYou-MONOOnionn-7733882.mp3',
            image: '../assets/img/natsu.jpg',
            time: '04:25'
        },
        {
            name: 'Muộn rồi mà sao còn',
            singer: 'Sơn Tùng MTP',
            path: '../assets/music/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3',
            image: '../assets/img/luffy1.jpg',
            time: '04:35'
        },
        {
            name: 'Em là kẻ đáng thương',
            singer: 'Phát Huy T4',
            path: '../assets/music/EmLaKeDangThuong-PhatHuyT4-8504796.mp3',
            image: '../assets/img/juvia.jpg',
            time: '04:18'
        },
        {
            name: 'Như Phút Ban Đầu',
            singer: 'Noo Phước Thịnh',
            path: '../assets/music/NhuPhutBanDau-NooPhuocThinh-6458668.mp3',
            image: '../assets/img/draken.jpg',
            time: '04:16'
        },
        {
            name: 'Ngày mai người ta lấy chồng',
            singer: 'Thành Đạt',
            path: '../assets/music/NgayMaiNguoiTaLayChong-ThanhDat-9466823.mp3',
            image: '../assets/img/ngaymailaychong.webp',
            time: '06:01'
        },
        {
            name: 'Cơn Mưa Ngang Qua',
            singer: 'Sơn Tùng MTP',
            path: '../assets/music/ConMuaNgangQua-SonTungMTP-2944936.mp3',
            image: '../assets/img/deku.png',
            time: '03:54'
        },
        {
            name: 'Nụ Hôn Bisou',
            singer: 'Mikelodic',
            path: '../assets/music/NuHonBisou-Mikelodic-9704760.mp3',
            image: '../assets/img/zoro.jpg',
            time: '02:36'
        },
        {
            name: 'Tất cả hoặc không là gì cả',
            singer: 'Thành Đạt',
            path: '../assets/music/TatCaHoacKhongLaGiCaCover-ThanhDat-11527102.mp3',
            image: '../assets/img/tatcahoac.jpg',
            time: '06:12'
        },
        {
            name: 'Bên trên tầng lầu',
            singer: 'Tăng Duy Tân',
            path: '../assets/music/BenTrenTangLau-TangDuyTan-7412012.mp3',
            image: '../assets/img/natsu1.jpg',
            time: '03:04'
        },
        {
            name: 'Em của ngày hôm qua',
            singer: 'Sơn Tùng MTP',
            path: '../assets/music/EmCuaNgayHomQua-SonTungMTP-2882720.mp3',
            image: '../assets/img/luffy2.jpg',
            time: '03:45'
        },
        {
            name: 'Nhờ em nhắn với người đó',
            singer: 'Tăng Phúc, Tonny Việt',
            path: '../assets/music/NhoEmNhanVoiNguoiDo-TangPhucTonnyViet-11733135.mp3',
            image: '../assets/img/conan.jpg',
            time: '05:17'
        },
        {
            name: 'Thuyền Quyên',
            singer: 'Diệu Kiên',
            path: '../assets/music/ThuyenQuyen-DieuKien-7583420.mp3',
            image: '../assets/img/sasuke1.png',
            time: '03:13'
        },
        {
            name: 'Lệ Lưu Ly',
            singer: 'Vũ Phụng Tiên, DT',
            path: '../assets/music/LeLuuLy-VuPhungTienDT-11753451.mp3',
            image: '../assets/img/obi.jpg',
            time: '03:20'
        },
        {
            name: 'Nơi Này Có Anh Remix',
            singer: 'Sơn Tùng MTP',
            path: '../assets/music/NoiNayCoAnhMasewRemix-SonTungMTP-4816830.mp3',
            image: '../assets/img/deku1.jpg',
            time: '04:17'
        },
        {
            name: 'Hạt Mưa Vương Vấn',
            singer: 'Thành Đạt',
            path: '../assets/music/HatMuaVuongVan-ThanhDat-11684790.mp3',
            image: '../assets/img/naruto.jpg',
            time: '04:08'
        },
        {
            name: 'À Lôi',
            singer: 'Tu Ti, Masew',
            path: '../assets/music/ALoi-Double2TMasew-10119691.mp3',
            image: '../assets/img/mina.jpg',
            time: '03:17'
        },
        {
            name: 'Gạt Đi Nước Mắt',
            singer: 'Noo Phước Thịnh',
            path: '../assets/music/GatDiNuocMat-NooPhuocThinhTonnyViet-5893819.mp3',
            image: '../assets/img/baji.jpg',
            time: '04:16'
        },
        {
            name: 'Sự Thật Phía Sau Một Lời Hứa',
            singer: 'Chi Dân',
            path: '../assets/music/SuThatSauMotLoiHua-ChiDan-3316709.mp3',
            image: '../assets/img/luabang.jpg',
            time: '04:55'
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
                    <div class="times">
                        <p>${song.time}</p>
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

        playBtn_header.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        play_title.onclick = function () {
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
            if (_this.isRandom) {
                $('.fa-random').style.color = "#9B4DE0";
            } else {
                $('.fa-random').style.color = "#8B8791";
            }
        }

        // Lặp lại bài hát
        repeatBtn.onclick = function (e) {
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active', _this.isRepeat)
            if (_this.isRepeat) {
                $('.fa-redo').style.color = "#9B4DE0";
            } else {
                $('.fa-redo').style.color = "#8B8791";
            }
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
            if (songNode || e.target.closest('.option')) {

                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrenSong()
                    _this.render()
                    audio.play()
                }

            }
        }

        // Xử lý thời gian song
        audio.addEventListener('loadeddata', function () {
            const minute = Math.floor(audio.duration / 60);
            var second = Math.floor(audio.duration - minute * 60);
            if (second < 10) {
                second = '0' + second;
            }
            lastTime.innerText = minute + ':' + second;
        })
        audio.addEventListener('timeupdate', function () {
            const curMinute = Math.floor(audio.currentTime / 60);
            var curSecond = Math.floor(audio.currentTime - curMinute * 60);
            if (curSecond < 10)
                curSecond = '0' + curSecond;
            firstTime.innerText = curMinute + ':' + curSecond;
        })
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