// Sports Car Data
const cars = [
    {
        id: 1,
        brand: 'Ferrari',
        model: 'SF90 Stradale',
        price: '$625,000',
        topSpeed: '211 mph',
        acceleration: '0-60 mph in 2.5s',
        power: '986 hp',
        image: 'assets/images/ferrari-sf90.jpg',
        description: 'The SF90 Stradale is Ferrari\'s first series production PHEV (Plug-in Hybrid Electric Vehicle).'
    },
    {
        id: 2,
        brand: 'Lamborghini',
        model: 'Aventador SVJ',
        price: '$517,000',
        topSpeed: '217 mph',
        acceleration: '0-60 mph in 2.8s',
        power: '759 hp',
        image: 'assets/images/lamborghini-aventador.jpg',
        description: 'The Aventador SVJ represents the purest essence of a Lamborghini super sports car.'
    },
    {
        id: 3,
        brand: 'Porsche',
        model: '911 Turbo S',
        price: '$203,500',
        topSpeed: '205 mph',
        acceleration: '0-60 mph in 2.6s',
        power: '640 hp',
        image: 'assets/images/porsche-911.jpg',
        description: 'The 911 Turbo S combines performance with everyday usability like no other supercar.'
    },
    {
        id: 4,
        brand: 'McLaren',
        model: '720S',
        price: '$299,000',
        topSpeed: '212 mph',
        acceleration: '0-60 mph in 2.8s',
        power: '710 hp',
        image: 'assets/images/mclaren-720s.jpg',
        description: 'The 720S redefines the boundaries of supercar performance and technology.'
    },
    {
        id: 5,
        brand: 'Aston Martin',
        model: 'DBS Superleggera',
        price: '$308,000',
        topSpeed: '211 mph',
        acceleration: '0-60 mph in 3.4s',
        power: '715 hp',
        image: 'assets/images/aston-martin.jpg',
        description: 'The DBS Superleggera is the ultimate GT, offering devastating performance.'
    }
];

// DOM Elements
const carsContainer = document.getElementById('cars-container');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('car-modal');
const modalContent = document.getElementById('modal-content');
const closeModal = document.getElementById('close-modal');

// Display Cars
function displayCars(carsToDisplay) {
    carsContainer.innerHTML = '';
    
    carsToDisplay.forEach((car, index) => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition';
        carCard.setAttribute('data-id', car.id);
        carCard.innerHTML = `
            <div class="h-48 overflow-hidden">
                <img src="${car.image}" alt="${car.brand} ${car.model}" class="w-full h-full object-cover">
            </div>
            <div class="p-6">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-xl font-bold">${car.brand} ${car.model}</h3>
                    <span class="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">${car.price}</span>
                </div>
                <div class="grid grid-cols-2 gap-2 mb-4 text-sm">
                    <div class="flex items-center">
                        <i class="fas fa-tachometer-alt mr-2 text-gray-500"></i>
                        <span>${car.topSpeed}</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-bolt mr-2 text-gray-500"></i>
                        <span>${car.acceleration}</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-horse mr-2 text-gray-500"></i>
                        <span>${car.power}</span>
                    </div>
                </div>
                <p class="text-gray-600 mb-4">${car.description}</p>
                <button class="view-details-btn w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition" data-id="${car.id}">
                    View Details
                </button>
            </div>
        `;
        carsContainer.appendChild(carCard);
    });
}

// Initialize the app
displayCars(cars);

// Event Listeners
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter');
        let filteredCars = cars;
        
        if (filterValue !== 'all') {
            filteredCars = cars.filter(car => car.brand.toLowerCase() === filterValue);
        }
        
        displayCars(filteredCars);
    });
});

// Modal functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-details-btn')) {
        const carId = parseInt(e.target.getAttribute('data-id'));
        const selectedCar = cars.find(car => car.id === carId);
        
        modalContent.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="h-64 md:h-full">
                    <img src="${selectedCar.image}" alt="${selectedCar.brand} ${selectedCar.model}" class="w-full h-full object-cover rounded-lg">
                </div>
                <div>
                    <h3 class="text-2xl font-bold mb-2">${selectedCar.brand} ${selectedCar.model}</h3>
                    <p class="text-gray-600 mb-4">${selectedCar.description}</p>
                    <div class="grid grid-cols-2 gap-4 mb-6">
                        <div class="bg-gray-100 p-4 rounded-lg">
                            <div class="text-sm text-gray-500">Top Speed</div>
                            <div class="text-xl font-bold">${selectedCar.topSpeed}</div>
                        </div>
                        <div class="bg-gray-100 p-4 rounded-lg">
                            <div class="text-sm text-gray-500">Acceleration</div>
                            <div class="text-xl font-bold">${selectedCar.acceleration}</div>
                        </div>
                        <div class="bg-gray-100 p-4 rounded-lg">
                            <div class="text-sm text-gray-500">Power</div>
                            <div class="text-xl font-bold">${selectedCar.power}</div>
                        </div>
                        <div class="bg-gray-100 p-4 rounded-lg">
                            <div class="text-sm text-gray-500">Price</div>
                            <div class="text-xl font-bold">${selectedCar.price}</div>
                        </div>
                    </div>
                    <button class="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition">
                        Contact Dealer
                    </button>
                </div>
            </div>
        `;
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
    
    if (e.target === modal || e.target === closeModal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
});
