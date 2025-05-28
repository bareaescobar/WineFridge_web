import { searchHandler } from './helpers/helpers'

const unloadBottleWelcomeModal = document.getElementById('unload-bottle-welcome-modal')
const unloadBottleSuggestModal = document.getElementById('unload-bottle-suggest-modal')
const unloadBottleManuallyModal = document.getElementById('unload-bottle-manually-modal')
const mealRecommendModal = document.getElementById('meal-recommend-modal')
// const unloadBottleInfoModal = document.getElementById('unload-bottle-info-modal')
const takeWineModal = document.getElementById('take-bottle-drawer-modal')
const takeWineSuccessModal = document.getElementById('take-bottle-success-modal')

document.querySelectorAll('[data-target]').forEach((btn) => {
    btn.addEventListener('click', () => {
        const target = document.getElementById(btn.dataset.target)
        target.classList.add('active')

        if (btn.dataset.target == 'unload-bottle-welcome-modal') {
            unloadBottleSuggestModal.classList.contains('active') && unloadBottleSuggestModal.classList.remove('active')

            unloadBottleManuallyModal.classList.contains('active') &&
                unloadBottleManuallyModal.classList.remove('active')

            mealRecommendModal.classList.contains('active') && mealRecommendModal.classList.remove('active')

            takeWineSuccessModal.classList.contains('active') && takeWineSuccessModal.classList.remove('active')
        }

        if (btn.dataset.target == 'meal-recommend-modal') {
            const btnText = btn.querySelector('.suggest-item-title').textContent
            const modalTitleSelectedTextElem = mealRecommendModal.querySelector('.modal-title span')
            const modalSubitleSelectedTextElem = mealRecommendModal.querySelector('.modal-subtitle span')

            modalTitleSelectedTextElem.textContent = btnText
            modalSubitleSelectedTextElem.textContent = btnText
        }

        if (btn.dataset.target == 'take-bottle-drawer-modal') {
            setTimeout(() => {
                btn.closest('.modal').classList.remove('active')
            }, 500)

            setTimeout(() => {
                takeWineSuccessModal.classList.add('active')
            }, 4500)

            setTimeout(() => {
                takeWineModal.classList.remove('active')
            }, 5000)
        }
    })
})

searchHandler('.search-wrapper')
