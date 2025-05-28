import {
    tabSelectorsHandler,
    wheelSelectorHandler,
    linearProgressHandler,
    сodeModalsGroupHandler,
    controlsDropdownTogglersHandler,
} from './helpers/helpers'

const fridgePincodeOldModal = document.getElementById('fridge-pincode-old-modal')
const fridgePincodeNewModal = document.getElementById('fridge-pincode-new-modal')
const fridgePincodeConfirmModal = document.getElementById('fridge-pincode-confirm-modal')
const fridgePincodeSuccessModal = document.getElementById('fridge-pincode-success-modal')
const fridgePincodeModalsArray = [
    fridgePincodeOldModal,
    fridgePincodeNewModal,
    fridgePincodeConfirmModal,
    fridgePincodeSuccessModal,
]

document.querySelectorAll('[data-target]').forEach((btn) => {
    btn.addEventListener('click', () => {
        const target = document.getElementById(btn.dataset.target)
        target.classList.add('active')

        if (btn.dataset.target == 'fridge-pincode-old-modal') {
            сodeModalsGroupHandler(fridgePincodeModalsArray)
        }
    })
})

tabSelectorsHandler('.tabs-group')
wheelSelectorHandler('.wheel-progress-group')
linearProgressHandler('.linear-progress-group')
controlsDropdownTogglersHandler('.controls-dropdown-toggler-btn')
