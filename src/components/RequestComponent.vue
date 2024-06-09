<template>
  <div>
    <!-- Search Input Section -->
    <input v-model="searchTerm" type="text" id="searchInput" @keyup.enter="sendSearchRequest" placeholder="Search..." />

    <select v-model="searchOption">
      <option value="all">All Hospitals</option>
      <option value="provider_id">ID Number</option>
      <option value="city">City Name</option>
      <option value="state">State Name</option>
      <option value="county_name">County Name</option>
      <option value="citystate">City/State Name</option>
      <option value="hospital_name">Hospital's Name</option>
    </select>
    <button @click="sendSearchRequest">Search Hospitals</button>

    <!-- Display search results -->
    <div class="search-results" v-if="searched && searchResults.length > 0">
      <h2>Search Results</h2>
      <ul>
        <li v-for="hospital in searchResults" :key="hospital.provider_id">
          <div class="hospital-info">
            {{ hospital.provider_id }} - {{ hospital.hospital_name }}
          </div>
          <div class="address">
            {{ hospital.address }}, {{ hospital.city }}, {{ hospital.state }} ({{ hospital.county_name }} COUNTY)
          </div>
        </li>
      </ul>
    </div>
    <div class="no-results" v-else-if="searched">
      No results found.
    </div>
  </div>
</template>

<script>
// import the JSON data
import data from './data.json';

export default {
  data() {
    return {
      searchTerm: '',
      searchOption: 'all',
      hospitals: data.xml.item, // assign the hospital data
      searchResults: [], // store search results
      searched: false, // flag to track if a search has been performed
    };
  },
  methods: {
    sendSearchRequest() {
      // filter hospitals based on search term and option
      this.searchResults = this.filterHospitals(this.searchTerm, this.searchOption);
      this.searched = true; // set the flag to true after search
    },
    filterHospitals(term, option) {

      if (option === 'all' || !term || !this.hospitals) {
        return this.hospitals;
      } else if (this.hospitals.length > 0) {
        return this.hospitals.filter(hospital => {
          const value = hospital[option]?.toString().toLowerCase();
          if (option === 'provider_id') {
            return value === term.toString();
          } else if (option === 'citystate') {
            const [searchCity, searchState] = term.toLowerCase().split(' ');
            console.log(searchCity + ' ' + searchState)
            return hospital.city.toLowerCase().includes(searchCity) && hospital.state.toLowerCase() === searchState;
          } else {
            return value && value.includes(term.toLowerCase());
          }
        });
      } else {
        return [];
      }
    }
  }
};
</script>

<style scoped>
* {
  font-family: 'Poppins', sans-serif;
}
/* Search Input Section */
label, input, select, button {
  margin-bottom: 10px;
  font-size: 16px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 35%;
  box-sizing: border-box;
  display: block;
  margin: 0 auto; /* Center the elements */
}

select, button {
  margin-top: 10px; /* Add some space between elements */
}

/* Button Style */
button {
  background-color: #00cfb3;
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #00ae97;
}

/* Search Results */
.search-results {
  margin-top: 20px;
  width: 35%; /* Reduce the width of search results */
  margin: 0 auto; /* Center the search results */
}

.search-results h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.search-results ul {
  list-style-type: none;
  padding: 0;
}

.search-results li {
  margin-bottom: 20px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-results li .hospital-info {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.search-results li .address {
  color: #666;
}

/* No Results Message */
.no-results {
  color: #FF5722;
  font-size: 1.2em;
  margin-top: 10px;
  text-align: center;
}
</style>
