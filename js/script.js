/*
  PERSONALIZAÇÃO RÁPIDA
  1) Coloque suas fotos dentro da pasta "fotos".
  2) Atualize os caminhos no array photos abaixo.
  3) Informe seu telefone nos campos whatsappNumber e phoneNumber.
  4) Edite/adapte os itens do array vehicleSpecs para incluir ou remover informações.
*/

const photos = [
  'fotos/01.jpg',
  'fotos/02.jpg',
  'fotos/03.jpg',
  'fotos/04.jpg',
  'fotos/05.jpg',
  'fotos/06.jpg',
  'fotos/07.jpg',
  'fotos/08.jpg',
  'fotos/09.jpg',
  'fotos/10.jpg',
  'fotos/11.jpg',
  'fotos/12.jpg',
  'fotos/13.jpg',
  'fotos/14.jpg',
  'fotos/15.jpg',
  'fotos/16.jpg',
  'fotos/17.jpg',
  'fotos/18.jpg',
  'fotos/19.jpg',
  'fotos/20.jpg',
  'fotos/21.jpg'
]

// Use DDI + DDD + número, somente dígitos. Ex.: 5511999999999
const whatsappNumber = '+5519995334976'
// Use DDI + DDD + número, somente dígitos. Ex.: 5511999999999
const phoneNumber = '19995334976'

const vehicleSpecs = [
  ['Motor', '2.0 16V aspirado'],
  ['Potência', '150 cv'],
  ['Câmbio', 'Manual de 6 marchas'],
  ['Combustível', 'Flex'],
  ['Ano / Modelo', '2015 / 2016'],
  ['Torque', '20,9 kgfm'],
  ['Tração', 'Dianteira'],
  ['Direção', 'Eletro-hidráulica'],
  ['Carroceria', 'Hatch • 4 portas'],
  ['Freios', 'Discos nas 4 rodas'],
  ['Versão', 'Sandero R.S. 2.0'],
  ['Multimidia', 'Com Android Auto e Apple CarPlay'],
  ['Tela', '7 Polegadas, sensitiva ao toque'],
  [
    'Segurança e direção',
    'Controle de estabilidade e tração, piloto automático'
  ],
  [
    'Facilidades',
    'Ar-condicionado digital e automático, sensor de estacionamento, vidros e travas elétricas, volante multifuncional com regulagem de altura'
  ],
  ['Top speed', 'Velocidade máxima de 202 km/h'],
  ['Rodas', 'Aro 17 e step de fábrica aro 16'],
  [
    'Especiais',
    'Bancos concha originais de fabrica, com regulagem de altura, pedaleiras em aço-inox'
  ]
]

const track = document.getElementById('gallery-track')
const dotsContainer = document.getElementById('gallery-dots')
const currentPhoto = document.getElementById('current-photo')
const totalPhotos = document.getElementById('total-photos')
const lightbox = document.getElementById('lightbox')
const lightboxImage = document.getElementById('lightbox-image')
const lightboxCounter = document.getElementById('lightbox-counter')
let activeIndex = 0
let touchStartX = 0

const pad = n => String(n).padStart(2, '0')

function renderGallery() {
  track.innerHTML = ''
  dotsContainer.innerHTML = ''
  totalPhotos.textContent = pad(photos.length)

  photos.forEach((src, index) => {
    const img = document.createElement('img')
    img.className = 'gallery-slide'
    img.src = src
    img.alt = `Sandero R.S. 2.0 - foto ${index + 1}`
    img.loading = index === 0 ? 'eager' : 'lazy'
    img.addEventListener('click', () => openLightbox(index))
    img.addEventListener(
      'error',
      () => {
        const placeholder = document.createElement('div')
        placeholder.className = 'gallery-placeholder'
        placeholder.innerHTML = `<div><strong>ADICIONE SUAS FOTOS</strong><small>Salve esta imagem como<br><b>${src}</b></small></div>`
        img.replaceWith(placeholder)
      },
      { once: true }
    )
    track.appendChild(img)

    const dot = document.createElement('button')
    dot.className = 'gallery-dot'
    dot.type = 'button'
    dot.setAttribute('aria-label', `Mostrar foto ${index + 1}`)
    dot.addEventListener('click', () => goTo(index))
    dotsContainer.appendChild(dot)
  })
  updateGallery()
  // Troca automática das fotos a cada 3,5 segundos
  setInterval(() => {
    if (!lightbox.classList.contains('open')) {
      goTo(activeIndex + 1)
    }
  }, 3500)
}

function goTo(index) {
  activeIndex = (index + photos.length) % photos.length
  track.style.transform = `translateX(-${activeIndex * 100}%)`
  track.style.transition = 'transform .28s ease'
  updateGallery()
}
function updateGallery() {
  currentPhoto.textContent = pad(activeIndex + 1)
  ;[...dotsContainer.children].forEach((dot, i) =>
    dot.classList.toggle('active', i === activeIndex)
  )
  if (lightbox.classList.contains('open')) updateLightbox()
}
function openLightbox(index) {
  activeIndex = index
  updateLightbox()
  lightbox.classList.add('open')
  lightbox.setAttribute('aria-hidden', 'false')
  document.body.classList.add('modal-open')
}
function closeLightbox() {
  lightbox.classList.remove('open')
  lightbox.setAttribute('aria-hidden', 'true')
  document.body.classList.remove('modal-open')
}
function updateLightbox() {
  lightboxImage.src = photos[activeIndex]
  lightboxCounter.textContent = `${pad(activeIndex + 1)} / ${pad(photos.length)}`
}
document
  .getElementById('prev-photo')
  .addEventListener('click', () => goTo(activeIndex - 1))
document
  .getElementById('next-photo')
  .addEventListener('click', () => goTo(activeIndex + 1))
document
  .getElementById('lightbox-prev')
  .addEventListener('click', () => goTo(activeIndex - 1))
document
  .getElementById('lightbox-next')
  .addEventListener('click', () => goTo(activeIndex + 1))
document
  .getElementById('lightbox-close')
  .addEventListener('click', closeLightbox)
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox()
})
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') goTo(activeIndex - 1)
  if (e.key === 'ArrowRight') goTo(activeIndex + 1)
})
track.addEventListener(
  'touchstart',
  e => {
    touchStartX = e.changedTouches[0].screenX
  },
  { passive: true }
)
track.addEventListener(
  'touchend',
  e => {
    const delta = e.changedTouches[0].screenX - touchStartX
    if (Math.abs(delta) > 45) goTo(activeIndex + (delta < 0 ? 1 : -1))
  },
  { passive: true }
)
lightbox.addEventListener(
  'touchstart',
  e => {
    touchStartX = e.changedTouches[0].screenX
  },
  { passive: true }
)
lightbox.addEventListener(
  'touchend',
  e => {
    const delta = e.changedTouches[0].screenX - touchStartX
    if (Math.abs(delta) > 45) goTo(activeIndex + (delta < 0 ? 1 : -1))
  },
  { passive: true }
)

const specGrid = document.getElementById('spec-grid')
vehicleSpecs.forEach(([label, value]) => {
  const item = document.createElement('div')
  item.className = 'spec-item'
  const labelEl = document.createElement('span')
  labelEl.className = 'spec-label'
  labelEl.textContent = label
  const valueEl = document.createElement('span')
  valueEl.className = 'spec-value'
  valueEl.textContent = value
  item.append(labelEl, valueEl)
  specGrid.appendChild(item)
})

const wa = document.getElementById('whatsapp-link')
const phone = document.getElementById('phone-link')
const message = encodeURIComponent(
  'Olá! Tenho interesse no Sandero R.S. 2.0 2015/2016. Poderia me passar mais informações?'
)
wa.href = `https://wa.me/${whatsappNumber}?text=${message}`
phone.href = `tel:${phoneNumber}`

renderGallery()
