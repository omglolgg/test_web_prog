const teas = [
	{
	  id: 1,
	  title: 'Bitcoin (ВТС)',
	  description: 'Stable network operation.Distributed resources that support the operation of the system neutralize the risks of failures due to equipment failure in a separate place, city, region.',
	  img: 'img/practice/01.jpg',
	  cost: 3000,
	},
	{
	  id: 2,
	  title: 'Ethereum (ETH)',
	  description: 'Decentralization of the system; Fast transactions; Blockchain platform allows you to create various decentralized applications.',
	  img: 'img/practice/02.jpg',
	  cost: 2200,
	},
	{
	  id: 3,
	  title: 'Binance Coin (BNB)',
	  description: 'Discounts for the services of the Finance exchange; Convenient use as a means of payment – the number of transactions is greater than in Ethereum; Low commission.',
	  img: 'img/practice/03.jpg',
	  cost: 1900,
	},
	{ 
	  id: 4,
	  title: 'Litecoin (LTC)',
	  description: 'Reliability; The ability to mine cryptocurrencies; Easier scalability than the BTC; High liquidity.',
	  img: 'img/practice/04.jpg',
	  cost: 1850,
	}

 ] 
 let selected = []
 
 const isSelected = (id) => !!selected.find(el => el.id == id)
 const removeSelect = (id) => selected = selected.filter(el => el.id != id)
 
 $(document).ready(() => {
	const openCartBtn = $('#open-cart-btn')
	const modalContainer = $('#practice__modal')
 
	const checkButtonStatus = () => {
	  if (selected.length) {
		 openCartBtn.removeClass('disabled')
	  } else {
		 openCartBtn.addClass('disabled')
	  }
	}
 
	for (const tea of teas) {
	  const id = `tea-${tea.id}`
 
	  $('.practice__body').append(`
		 <div class="practice__column">
			<article class="practice__item item-practice" id="${id}">
			  <div class="item-practice__content">
				 <a href="" class="item-practice__link">
					<h4 class="item-practice__title">${tea.title}</h4>
				 </a>
				 <div class="item-practice__text">
					${tea.description}
				 </div>
			  </div>
			  <div class="item-practice__image _ibg">
				 <img src="${tea.img}" alt="A single source of truth">
			  </a>
			</article>
		 </div>
	  `)
 
	  $(`#${id}`).click((event) => {
		 if (isSelected(tea.id)) {
			$(event.currentTarget).removeClass('selected')
			removeSelect(tea.id)
			checkButtonStatus()
		 } else {
			$(event.currentTarget).addClass('selected')
			selected.push(tea)
			checkButtonStatus()
		 }
	  })
	}
 
	const makeRotationCalculator = (delta, value = 2) => {
	  let rotation = 0
 
	  delta = Math.abs(delta)
 
	  return (baseX) => {
		 let currentX = baseX
 
		 return (x) => {
			if (x - currentX >= delta) {
			  rotation += value
 
			  currentX = x
			} else if (x - currentX <= -delta) {
			  rotation -= value
 
			  currentX = x
			}
 
			return rotation
		 }
	  }
	}
 
	openCartBtn.click(() => {
	  if (!selected.length) {
		 return
	  }
 
	  modalContainer.empty()
 
	  for (const tea of selected) {
		 const id = `cart-tea-${tea.id}`
 
		 modalContainer.append(`
			<article class="practice__modal__block">
			  <div class="item-practice__content">
				 <a class="item-practice__link">
					<h4 class="item-practice__title">${tea.title}</h4>
				 </a>
				 <div class="item-practice__text">
					${tea.description}
				 </div>
				 <div class="item-practice__image _ibg" id="rotation-container-${id}">
					<img src="${tea.img}" style="pointer-events: none;" alt="A single source of truth" id="image-${id}">
				 </div>
				 <p class="item-practice__cost">Cost: \$${tea.cost}</p>
			  </div>
			</article>
		 `)
 
		 const rotationContainer = $(`#rotation-container-${id}`)
		 const image = $(`#image-${id}`)
 
		 const makeGetRotation = makeRotationCalculator(5)
 
		 rotationContainer.hover((e) => {
			const getRotation = makeGetRotation(e.offsetX)
 
			rotationContainer.unbind('mousemove')
			rotationContainer.bind('mousemove', (e) => {
			  const target = $(e.currentTarget)
 
			  const width = target.width()
 
			  const rotation = getRotation(e.offsetX)
 
			  image.css({ transform: `rotate3d(0.5, 1, 0, ${rotation}deg)` })
			})
		 })
	  }
 
	  modalContainer.append(`
		 <div class="practice__modal__end">
			<p class="practice__modal__total">Total cost: \$${selected.reduce((prev, cur) => prev + cur.cost, 0)}<p>
			<a
			  class="main-block__button main-block__button_orange practice_modal__confirm__btn"
			  id="confirm-purchase-btn"
			>Confirm purchase</a>
		 </div>
	  `)
 
	  $('#confirm-purchase-btn').click(() => {
		 alert('Покупка оформлена!')
 
		 $.modal.close()
	  })
 
	  modalContainer.modal()
	})
 })