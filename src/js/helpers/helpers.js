import Swiper from 'swiper'
import 'swiper/css'

export function setCookie(cookieName, cookieValue) {
    let d = new Date()
    d.setTime(d.getTime() + 90 * 24 * 60 * 60 * 1000) // 90 days
    document.cookie = cookieName + '=' + cookieValue + ';expires=' + d.toUTCString() + ';path=/'
}

export function getCookie(cookieName) {
    let name = cookieName + '='
    let i,
        c,
        ca = document.cookie.split(';')
    for (i = 0; i < ca.length; i++) {
        c = ca[i]
        while (c.charAt(0) == ' ') c = c.substring(1)
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
    }
    return ''
}

export function verifyInputsHandler(inputsModal, nextModal) {
    const firstInput = inputsModal.querySelector('input')
    const inputs = inputsModal.querySelectorAll('input')

    firstInput.focus()

    inputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            input.value = input.value.replace(/\D/g, '').slice(0, 1)

            if (input.value && index < inputs.length - 1) {
                const next = inputs[index + 1]
                next.disabled = false
                next.focus()
            }

            const allFilled = [...inputs].every((inp) => inp.value.length === 1)
            if (allFilled) {
                const code = [...inputs].map((inp) => inp.value).join('')
                onComplete(code)
            }
        })

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !input.value && index > 0) {
                const prev = inputs[index - 1]
                prev.focus()
                prev.value = ''
            }
        })
    })

    function onComplete(code) {
        console.log('code ' + code)
        nextModal.classList.add('active')

        inputs.forEach((input, i) => {
            input.value = ''
            input.disabled = i !== 0
        })
    }
}

export function passwordInputsHandler(allElementsClassName) {
    const passwords = document.querySelectorAll(allElementsClassName)

    passwords.forEach((password) => {
        const passwordInput = password.querySelector('input[type="password"]')
        const dummyInput = password.querySelector('input[type="text"]')
        const togglePasswordBtn = password.querySelector('.toggle-password-btn')

        let isMasked = true

        let actualPassword = ''

        dummyInput.addEventListener('input', function (e) {
            const newValue = e.target.value

            if (newValue.length > actualPassword.length) {
                const addedChar = newValue.slice(-1)
                actualPassword += addedChar
            } else if (newValue.length < actualPassword.length) {
                actualPassword = actualPassword.slice(0, newValue.length)
            }

            passwordInput.value = actualPassword

            if (isMasked) {
                dummyInput.value = '*'.repeat(actualPassword.length)
            }
        })

        togglePasswordBtn.addEventListener('click', () => {
            isMasked = !isMasked

            dummyInput.value = isMasked ? '*'.repeat(actualPassword.length) : actualPassword

            togglePasswordBtn
                .querySelector('[href]')
                .setAttribute('href', isMasked ? '#icon-eyeslash' : '#icon-eyeslash-visible')
        })

        dummyInput.value = ''
        passwordInput.value = ''
    })
}

export function linearProgressHandler(allElementsClassName) {
    const linearProgressRanges = document.querySelectorAll(allElementsClassName)

    linearProgressRanges.forEach((range) => {
        const rangeText = range.querySelector('.linear-progress-value span')
        const rangeInput = range.querySelector('input')
        const rangeProgress = range.querySelector('.input-progress')
        const defaultInputValue = rangeInput.value

        rangeText.innerText = `${defaultInputValue}`
        rangeProgress.style.width = `${defaultInputValue}%`

        rangeInput.addEventListener('input', () => {
            const value = rangeInput.value
            rangeText.innerText = `${value}`
            rangeProgress.style.width = `${value}%`
        })
    })
}

export function wheelSelectorHandler(allElementsClassName) {
    const wheelProgressRanges = document.querySelectorAll(allElementsClassName)

    wheelProgressRanges.forEach((range) => {
        const inputText = range.querySelector('.wheel-progress-value span')
        const input = range.querySelector('input')
        const slider = range.querySelector('.swiper-container')
        const slides = slider.querySelectorAll('.swiper-slide')

        new Swiper(slider, {
            loop: true,
            grabCursor: true,
            slidesPerView: 5,
            initialSlide: Math.floor(slides.length / 2),
            centeredSlides: true,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            loopedSlides: slides.length,

            on: {
                afterInit: function () {
                    updateInputValue(this)

                    setTimeout(() => {
                        this.slideToLoop(this.realIndex, 0)
                    }, 50)
                },
                slideChangeTransitionEnd: function () {
                    updateInputValue(this)
                },
            },
        })

        function updateInputValue(swiper) {
            requestAnimationFrame(() => {
                const slides = swiper.slides
                const index = swiper.activeIndex

                if (!slides || !slides.length || index === undefined) return

                const activeSlide = slides[index]
                if (!activeSlide) return

                const value = activeSlide.textContent.trim()
                input.value = value
                inputText.innerText = `${value}`
            })
        }
    })
}

export function tabSelectorsHandler(allElementsClassName) {
    const tabsGroups = document.querySelectorAll(allElementsClassName)

    tabsGroups.forEach((tabsGroup) => {
        const tabSelectors = tabsGroup.querySelectorAll('.tab-switcher button')
        const tabs = tabsGroup.querySelectorAll('.tab')

        tabSelectors.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                tabSelectors.forEach((btn) => btn.classList.contains('active') && btn.classList.remove('active'))
                tabs.forEach((tab) => tab.classList.contains('active') && tab.classList.remove('active'))
                tabs[index].classList.add('active')
                btn.classList.add('active')
            })
        })
    })
}

export function searchHandler(allElementsClassName) {
    const searchWrappers = document.querySelectorAll(allElementsClassName)

    searchWrappers.forEach((searchWrapper) => {
        const searchOpenBtn = searchWrapper.querySelector('.search-open-btn')
        const searchCloseBtn = searchWrapper.querySelector('.search-close-btn')
        const searchForm = searchWrapper.querySelector('.search-form')

        searchOpenBtn.addEventListener('click', () => {
            searchWrapper.classList.add('active')
            searchForm.querySelector('input').focus()
        })

        searchCloseBtn.addEventListener('click', () => {
            searchWrapper.classList.remove('active')
        })
    })
}

export function favoriteHandler(allElementsClassName) {
    const favoriteBtns = document.querySelectorAll(allElementsClassName)

    favoriteBtns.forEach((favoriteBtn) => {
        favoriteBtn.addEventListener('click', () => {
            favoriteBtn.classList.toggle('active')
        })
    })
}

export function сodeModalsGroupHandler(codeModalsArray) {
    let codeState
    let codeGroups = []
    let placeholdersDots = []
    let groupPincodeLength = 0

    codeModalsArray.length == 4 ? (codeState = 'initial') : (codeState = 'enter-new-code')

    codeGroups.push(codeModalsArray[0].querySelector('.code-group'), codeModalsArray[1].querySelector('.code-group'))
    codeModalsArray[2].querySelector('.code-group') && codeGroups.push(codeModalsArray[2].querySelector('.code-group'))

    placeholdersDots.push(
        ...codeModalsArray[0].querySelectorAll('.code-group-placeholder span'),
        ...codeModalsArray[1].querySelectorAll('.code-group-placeholder span'),
    )
    codeModalsArray[2].querySelector('.code-group') &&
        placeholdersDots.push(...codeModalsArray[2].querySelectorAll('.code-group-placeholder span'))

    codeGroups.forEach((codeGroup) => {
        const dials = codeGroup.querySelectorAll('.code-group-dials button:not(.reset-btn)')
        const resetBtn = codeGroup.querySelector('.reset-btn')
        const placeholders = codeGroup.querySelectorAll('.code-group-placeholder span')

        dials.forEach((btn) => {
            btn.addEventListener('click', addPinCodeDigit)
        })

        resetBtn.addEventListener('click', resetGroupPinCode)

        function addPinCodeDigit() {
            groupPincodeLength++

            placeholders[groupPincodeLength - 1].classList.add('active')

            if (groupPincodeLength == 4) {
                showNextDialModal(codeModalsArray)

                setTimeout(() => {
                    resetGroupPinCode()
                }, 500)
            }
        }
    })

    function resetGroupPinCode() {
        placeholdersDots.forEach((dot) => dot.classList.remove('active'))
        groupPincodeLength = 0
    }

    function showNextDialModal(codeModalsArray) {
        // old code modals array: new modal, confirm modal, success modal || new code modals array: confirm modal, success modal

        if (codeModalsArray.length == 4) {
            if (codeState == 'initial') {
                codeState = 'enter-new-code'
                codeModalsArray[1].classList.add('active')
            } else if (codeState == 'enter-new-code') {
                codeState = 'confirm-new-code'
                codeModalsArray[2].classList.add('active')
            } else if (codeState == 'confirm-new-code') {
                codeState = 'success'
                codeModalsArray[3].classList.add('active')
            } else if (codeState == 'success') {
                codeState = 'initial'
            }
        }

        if (codeModalsArray.length == 3) {
            if (codeState == 'enter-new-code') {
                codeState = 'confirm-new-code'
                codeModalsArray[1].classList.add('active')
            } else if (codeState == 'confirm-new-code') {
                codeState = 'success'
                codeModalsArray[2].classList.add('active')
            } else if (codeState == 'success') {
                codeState = 'enter-new-code'
            }
        }
    }
}

export function controlsDropdownTogglersHandler(allElementsClassName) {
    const controlsDropdownTogglerBtns = document.querySelectorAll(allElementsClassName)
    const controlsDropdownBtns = document.querySelectorAll('.controls-dropdown button')

    controlsDropdownTogglerBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            btn.closest('div').querySelector('.controls-dropdown').classList.toggle('active')
        })
    })
    controlsDropdownBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            btn.dataset.target && btn.closest('.controls-dropdown').classList.remove('active')
        })
    })
}

export function imgInputsHandler(allElementsClassName) {
    const imgInputWrappers = document.querySelectorAll(allElementsClassName)

    imgInputWrappers.forEach((inputWrapper) => {
        const input = inputWrapper.querySelector('input[type="file"]')
        const img = inputWrapper.querySelector('img')

        input.addEventListener('change', () => readURL(input, img))
    })

    function readURL(input, img) {
        if (input.files && input.files[0]) {
            let reader = new FileReader()

            reader.onload = function (e) {
                img.setAttribute('src', e.target.result)
            }

            reader.readAsDataURL(input.files[0])
        }
    }
}
