import { imgInputsHandler, favoriteHandler } from './helpers/helpers'

const loadBottleWelcomeModal = document.getElementById('load-bottle-welcome-modal')
const scanBottleErrorModal = document.getElementById('scan-bottle-error-modal')
const loadBottleInfoModal = document.getElementById('load-bottle-info-modal')
const loadBottleDrawerModal = document.getElementById('load-bottle-drawer-modal')
const loadBottleSuccessModal = document.getElementById('load-bottle-success-modal')
const loadBottleErrorModal = document.getElementById('load-bottle-error-modal')

const scanBtn = loadBottleWelcomeModal.querySelector('.btn')
const scanTitle = loadBottleWelcomeModal.querySelector('.modal-head-title')
const scanImg = loadBottleWelcomeModal.querySelector('.full')
const scanCircle = loadBottleWelcomeModal.querySelector('.processing')

let scanButtonHandlerAttached = false

document.querySelectorAll('[data-target]').forEach((btn) => {
    btn.addEventListener('click', () => {
        const target = document.getElementById(btn.dataset.target)
        target.classList.add('active')

        if (btn.dataset.target == 'load-bottle-welcome-modal') {
            scanBottleScene()
        }
        if (btn.dataset.target == 'load-bottle-drawer-modal') {
            resetBottleScene()

            setTimeout(() => {
                // dummy scan random show, delete after
                Math.random() > 0.5
                    ? loadBottleSuccessModal.classList.add('active')
                    : loadBottleErrorModal.classList.add('active')
            }, 3000)

            setTimeout(() => {
                loadBottleDrawerModal.classList.remove('active')
            }, 4000)
        }
    })
})

function scanBottleScene() {
    setTimeout(() => scanImg.classList.add('active'), 2000)
    setTimeout(() => (scanTitle.style.opacity = 1), 2500)
    setTimeout(() => scanBtn.classList.add('active'), 3500)

    scanBottleErrorModal.classList.remove('active')
    loadBottleInfoModal.classList.remove('active')

    if (!scanButtonHandlerAttached) {
        scanBtn.addEventListener('click', () => {
            scanCircle.classList.add('active')

            // dummy scan event
            setTimeout(() => {
                if (Math.random() > 0.5) {
                    loadBottleInfoModal.classList.add('active')
                } else {
                    scanBottleErrorModal.classList.add('active')
                }
            }, 2000)

            setTimeout(() => {
                resetBottleScene()
            }, 3000)
        })

        scanButtonHandlerAttached = true
    }
}

function resetBottleScene() {
    scanTitle.style.opacity = 0
    scanImg.classList.remove('active')
    scanBtn.classList.remove('active')
    scanCircle.classList.remove('active')
}

imgInputsHandler('.img-file-wrapper')
favoriteHandler('.favorite-btn')
scanBottleScene()
