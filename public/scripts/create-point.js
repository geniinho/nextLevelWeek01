function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(res => res.json()).then(states => {
        for (state of states) {
            ufSelect.innerHTML += `<option value="${state.id}"> ${state.nome} </option value>`
        }
    })
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.innerHTML = `<option value> Selecione a cidade </option value>`
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json())
        .then(cities => {
            for (city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}"> ${city.nome} </option value>`
            }
            citySelect.disabled = false
        })

}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)



// itens de coleta
//todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)

}


const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {

    const itemLi = event.target
        // add or remove class selected
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // verificar se existens selecionados
    //pegar itens selecionados
    const alreadySelected = selectedItems.findIndex(function(item) {
        const itemFound = item === itemId
        return itemFound
    })

    //se ja estiver selecionado remover
    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => {
            const itemsIsDiferent = item != itemId //false
            return itemsIsDiferent
        })
        selectedItems = filteredItems
    } else {
        //se não estiver add a lista
        selectedItems.push(itemId)
    }
    //att o input hiden com os campos selecionados
    collectedItems.value = selectedItems

}