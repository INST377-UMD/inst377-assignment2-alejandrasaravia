document.addEventListener("DOMContentLoaded", () => {
    const dogCarousel = document.getElementById("dog-carousel");
    const breedButtonsContainer = document.getElementById("breed-buttons-container");
    const breedInfoContainer = document.getElementById("breed-info");
    const breedNameElement = document.getElementById("breed-name");
    const breedDescriptionElement = document.getElementById("breed-description");
    const minLifeElement = document.getElementById("min-life");
    const maxLifeElement = document.getElementById("max-life");

    function initializeSlider() {
      simpleslider.getSlider({
        transitionTime: 1,
        delay: 3,
      });
    }

    async function loadDogImages() {
      const url = "https://dog.ceo/api/breeds/image/random/10";
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === "success") {
          dogCarousel.innerHTML = data.message
            .map(img => `<img src="${img}" alt="Random Dog" style="width: 100%; height: auto;">`)
            .join("");
          initializeSlider();
        } else {
          console.error("Error fetching dog images:", data.message);
        }
      } catch (error) {
        console.error("Error fetching dog images:", error);
      }
    }

    async function loadDogBreeds() {
      const url = "https://dogapi.dog/api/v2/breeds";
      try {
        const response = await fetch(url);
        const data = await response.json();

        const randomBreeds = data.data.sort(() => 0.5 - Math.random()).slice(0, 10);

        breedButtonsContainer.innerHTML = "";
        randomBreeds.forEach(breed => {
          const button = document.createElement("button");
          button.textContent = breed.attributes.name;
          button.setAttribute("class", "breed-button");
          button.addEventListener("click", () => displayBreedInfo(breed));
          breedButtonsContainer.appendChild(button);
        });
      } catch (error) {
        console.error("Error fetching dog breeds:", error);
      }
    }

    function displayBreedInfo(breed) {
      const { name, description, min_life, max_life } = breed.attributes;

      breedNameElement.textContent = name;

      breedDescriptionElement.textContent = description || "No description available.";

      minLifeElement.textContent = min_life !== undefined && min_life !== null ? `${min_life} years` : "N/A";

      maxLifeElement.textContent = max_life !== undefined && max_life !== null ? `${max_life} years` : "N/A";

      breedInfoContainer.style.display = "block";
    }
 
    loadDogImages();
    loadDogBreeds();
  });