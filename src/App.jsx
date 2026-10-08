import { useState } from 'react'
import './App.css'

const doctors = [
  {
    id: 1,
    name: 'Dr. Shafiq Omid',
    specialty: 'Cardiology',
    rating: 4.9,
    hospital: 'Kabul Heart Center',
    location: 'Kabul, Afghanistan',
    available: '9:00 AM - 2:00 PM',
    phone: '+93 700 000 001',
    languages: 'English, Dari, Pashto',
    image: 'https://i.pravatar.cc/300?img=12',
  },
  {
    id: 2,
    name: 'Dr. Marjan Mohammadzai',
    specialty: 'Dermatology',
    rating: 4.8,
    hospital: 'City Medical Center',
    location: 'Kabul, Afghanistan',
    available: '10:00 AM - 4:00 PM',
    phone: '+93 700 000 002',
    languages: 'English, Dari, Pashto',
    image: 'https://i.pravatar.cc/300?img=47',
  },
  {
    id: 3,
    name: 'Dr. Omar Mohammadzai',
    specialty: 'Neurology',
    rating: 4.7,
    hospital: 'Kabul Medical Hospital',
    location: 'Kabul, Afghanistan',
    available: '8:00 AM - 1:00 PM',
    phone: '+93 700 000 003',
    languages: 'English, Dari',
    image: 'https://i.pravatar.cc/300?img=11',
  },
  {
    id: 4,
    name: 'Dr. Marwa Mohammadzai',
    specialty: 'Pediatrics',
    rating: 4.9,
    hospital: 'Children Care Center',
    location: 'Kabul, Afghanistan',
    available: '9:00 AM - 3:00 PM',
    phone: '+93 700 000 004',
    languages: 'English, Dari, Pashto',
    image: 'https://i.pravatar.cc/300?img=44',
  },
]

function App() {
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [search, setSearch] = useState('')
  const [specialty, setSpecialty] = useState('All')
  const [gender, setGender] = useState('All')
  const [view, setView] = useState('list')

  const filteredDoctors = doctors.filter((doctor) => {
    const searchText = search.toLowerCase()

    const matchesSearch =
      doctor.name.toLowerCase().includes(searchText) ||
      doctor.specialty.toLowerCase().includes(searchText) ||
      doctor.hospital.toLowerCase().includes(searchText)

    const matchesSpecialty =
      specialty === 'All' || doctor.specialty === specialty

    return matchesSearch && matchesSpecialty
  })

  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-logo">M</div>

          <div>
            <h2>MyPatientHUB</h2>
            <p>Healthcare Platform</p>
          </div>
        </div>

        <nav className="sidebar-nav">

          <a href="#">
            <span>▦</span>
            Dashboard
          </a>

          <a href="#">
            <span>▣</span>
            Appointments
          </a>

          <a href="#">
            <span>♧</span>
            Find Patient
          </a>

          <a href="#" className="active">
            <span>♙</span>
            Find Doctor
          </a>

          <a href="#">
            <span>▤</span>
            My Records
          </a>

          <a href="#">
            <span>▱</span>
            Chat
          </a>

          <a href="#">
            <span>◈</span>
            Pharmacy
          </a>

          <a href="#">
            <span>♧</span>
            My Dependents
          </a>

        </nav>

        <div className="download-card">

          <h3>Download</h3>

          <p>MyPIHUB Mobile App</p>

          <div className="store-buttons">
            <button> App Store</button>
            <button>▶ Google Play</button>
          </div>

        </div>

      </aside>

      {/* MAIN */}
      <main className="main">

        {/* TOP HEADER */}
        <header className="topbar">

          <div>
            <div className="breadcrumb">
              ⌂ / Find a Doctor
            </div>

            <h1>Find a Doctor</h1>
          </div>

          <div className="topbar-right">

            <div className="top-search">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Type here..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button className="logout">
              ⇥ Log out
            </button>

            <span className="top-icon">⚙</span>
            <span className="top-icon">♧</span>

          </div>

        </header>

        <div className="content">

          {/* HERO */}
          <section className="doctor-hero">

            <h2>Find a Doctor</h2>

            <p>
              Search Doctors and schedule an appointment
            </p>

            <div className="hero-search">

              <div className="hero-input">

                <span>⌕</span>

                <input
                  type="text"
                  placeholder="Search a doctor by name, specialty"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

              </div>

              <button type="button">
                SEARCH
              </button>

            </div>

          </section>

          {/* MAP / LIST */}
          <div className="view-switch">

            <button
              className={view === 'map' ? 'active' : ''}
              onClick={() => setView('map')}
            >
              🗺 Map
            </button>

            <button
              className={view === 'list' ? 'active' : ''}
              onClick={() => setView('list')}
            >
              ☷ List
            </button>

          </div>

          <div className="doctor-layout">

            {/* FILTER */}
            <aside className="filters">

              <h2>Filter By</h2>

              <div className="filter-item">

                <label>Specialty</label>

                <select
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                >
                  <option>All</option>
                  <option>Cardiology</option>
                  <option>Dermatology</option>
                  <option>Neurology</option>
                  <option>Pediatrics</option>
                </select>

              </div>

              <div className="filter-item">

                <label>Gender</label>

                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option>All</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>

              </div>

            </aside>

            {/* RESULTS */}
            <section className="results">

              <div className="results-header">

                <span>
                  {filteredDoctors.length} doctor(s) found
                </span>

                <div className="sort-buttons">
                  <button>NAME</button>
                  <button>SPECIALTY</button>
                </div>

              </div>

              {view === 'list' ? (

                <div className="doctor-list">

                  {filteredDoctors.length === 0 ? (

                    <div className="no-results">
                      No doctors found.
                    </div>

                  ) : (

                    filteredDoctors.map((doctor) => (

                      <div
                        className="doctor-card"
                        key={doctor.id}
                      >

                        <img
                          src={doctor.image}
                          alt={doctor.name}
                        />

                        <div className="doctor-info">

                          <h2>
                            {doctor.name}
                          </h2>

                          <h3>
                            {doctor.specialty}
                          </h3>

                          <p>
                            📍 {doctor.location}
                          </p>

                          <p>
                            ☎ {doctor.phone}
                          </p>

                          <p>
                            ◉ {doctor.languages}
                          </p>

                          <p>
                            🏥 {doctor.hospital}
                          </p>

                          <p>
                            🕒 {doctor.available}
                          </p>

                          <button
                            className="profile-button"
                            onClick={() =>
                              setSelectedDoctor(doctor)
                            }
                          >
                            View Profile
                          </button>

                        </div>

                        <div className="rating">
                          ⭐ {doctor.rating}
                        </div>

                      </div>

                    ))

                  )}

                </div>

              ) : (

                <div className="map-container">

                  <div className="map-content">
                    🗺
                    <h2>Doctor Locations</h2>
                    <p>
                      Doctor locations will appear here.
                    </p>
                  </div>

                </div>

              )}

            </section>

          </div>

          {/* PROFILE MODAL */}
          {selectedDoctor && (

            <div
              className="modal-overlay"
              onClick={() => setSelectedDoctor(null)}
            >

              <div
                className="profile-modal"
                onClick={(e) => e.stopPropagation()}
              >

                <button
                  className="close-button"
                  onClick={() => setSelectedDoctor(null)}
                >
                  ×
                </button>

                <img
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                />

                <h2>
                  {selectedDoctor.name}
                </h2>

                <h3>
                  {selectedDoctor.specialty}
                </h3>

                <p>
                  ⭐ Rating: {selectedDoctor.rating}
                </p>

                <p>
                  🏥 {selectedDoctor.hospital}
                </p>

                <p>
                  📍 {selectedDoctor.location}
                </p>

                <p>
                  ☎ {selectedDoctor.phone}
                </p>

                <p>
                  ◉ {selectedDoctor.languages}
                </p>

                <p>
                  🕒 {selectedDoctor.available}
                </p>

                <button className="book-button">
                  Book Appointment
                </button>

              </div>

            </div>

          )}

        </div>

      </main>

    </div>
  )
}

export default App