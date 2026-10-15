
import { useState } from 'react';
import '../App.css';

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
    gender: 'Male',
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
    gender: 'Female',
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
    gender: 'Male',
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
    gender: 'Female',
    image: 'https://i.pravatar.cc/300?img=44',
  },
];

function FindDoctor() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('All');
  const [gender, setGender] = useState('All');
  const [view, setView] = useState('list');

  const filteredDoctors = doctors.filter((doctor) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      doctor.name.toLowerCase().includes(searchText) ||
      doctor.specialty.toLowerCase().includes(searchText) ||
      doctor.hospital.toLowerCase().includes(searchText);

    const matchesSpecialty =
      specialty === 'All' || doctor.specialty === specialty;

    const matchesGender =
      gender === 'All' || doctor.gender === gender;

    return matchesSearch && matchesSpecialty && matchesGender;
  });

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">M</div>
          <div>
            <h2>MyPatientHUB</h2>
            <p>Healthcare Platform</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <a href="/dashboard">▦ Dashboard</a>
          <a href="/dashboard">▣ Appointments</a>
          <a href="/find-doctor" className="active">♙ Find Doctor</a>
          <a href="/dashboard">▤ My Records</a>
        </nav>

        <div className="download-card">
          <h3>Download</h3>
          <p>MyPatientHUB Mobile App</p>
          <div className="store-buttons">
            <button type="button">App Store</button>
            <button type="button">Google Play</button>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <div className="breadcrumb">Home / Find a Doctor</div>
            <h1>Find a Doctor</h1>
          </div>

          <div className="topbar-right">
            <div className="top-search">
              <span>⌕</span>
              <input
                type="search"
                placeholder="Search doctors..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <a className="logout" href="/login">Log out</a>
          </div>
        </header>

        <div className="content">
          <section className="doctor-hero">
            <h2>Find a Doctor</h2>
            <p>Search doctors and explore their profiles.</p>

            <div className="hero-search">
              <div className="hero-input">
                <span>⌕</span>
                <input
                  type="search"
                  placeholder="Search by name, specialty or hospital"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
              <button type="button">SEARCH</button>
            </div>
          </section>

          <div className="view-switch">
            <button
              type="button"
              className={view === 'map' ? 'active' : ''}
              onClick={() => setView('map')}
            >
              Map
            </button>
            <button
              type="button"
              className={view === 'list' ? 'active' : ''}
              onClick={() => setView('list')}
            >
              List
            </button>
          </div>

          <div className="doctor-layout">
            <aside className="filters">
              <h2>Filter By</h2>

              <div className="filter-item">
                <label htmlFor="specialty">Specialty</label>
                <select
                  id="specialty"
                  value={specialty}
                  onChange={(event) => setSpecialty(event.target.value)}
                >
                  <option value="All">All specialties</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Pediatrics">Pediatrics</option>
                </select>
              </div>

              <div className="filter-item">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(event) => setGender(event.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </aside>

            <section className="results">
              <div className="results-header">
                <span>{filteredDoctors.length} doctor(s) found</span>
              </div>

              {view === 'list' ? (
                <div className="doctor-list">
                  {filteredDoctors.length === 0 ? (
                    <div className="no-results">
                      No doctors found. Try another search.
                    </div>
                  ) : (
                    filteredDoctors.map((doctor) => (
                      <article className="doctor-card" key={doctor.id}>
                        <img src={doctor.image} alt={doctor.name} />

                        <div className="doctor-info">
                          <h2>{doctor.name}</h2>
                          <h3>{doctor.specialty}</h3>
                          <p>Location: {doctor.location}</p>
                          <p>Phone: {doctor.phone}</p>
                          <p>Languages: {doctor.languages}</p>
                          <p>Hospital: {doctor.hospital}</p>
                          <p>Available: {doctor.available}</p>

                          <button
                            type="button"
                            className="profile-button"
                            onClick={() => setSelectedDoctor(doctor)}
                          >
                            View Profile
                          </button>
                        </div>

                        <div className="rating">⭐ {doctor.rating}</div>
                      </article>
                    ))
                  )}
                </div>
              ) : (
                <div className="map-container">
                  <div className="map-content">
                    <h2>Doctor Locations</h2>
                    <p>
                      Map integration has not been added yet. Switch to List
                      to view the sample doctors.
                    </p>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      {selectedDoctor && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedDoctor(null)}
        >
          <div
            className="profile-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="close-button"
              onClick={() => setSelectedDoctor(null)}
              aria-label="Close profile"
            >
              ×
            </button>

            <img src={selectedDoctor.image} alt={selectedDoctor.name} />
            <h2>{selectedDoctor.name}</h2>
            <h3>{selectedDoctor.specialty}</h3>
            <p>⭐ Rating: {selectedDoctor.rating}</p>
            <p>Hospital: {selectedDoctor.hospital}</p>
            <p>Location: {selectedDoctor.location}</p>
            <p>Phone: {selectedDoctor.phone}</p>
            <p>Languages: {selectedDoctor.languages}</p>
            <p>Available: {selectedDoctor.available}</p>
            <button type="button" className="book-button">
              Book Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FindDoctor;
