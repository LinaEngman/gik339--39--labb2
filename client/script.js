const url = "http://localhost:3000/users"
fetch(url)

.then((response) => { 
    if (!response.ok) {
        throw new Error(`Network response was not ok, status code: ${response.status}`);
    }
    console.log(response);
    return response.json();
})
//.then((jsonData) => console.log(jsonData));
.then((jsonData) => {
    // Skapa en array av JavaScript-objekt som representerar användare
    const usersArray = jsonData.map((user) => {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        color: user.color,
      };
    });
    // Skapa ett ul-element och ge det en klass
    const userList = document.createElement("ul");
    userList.classList.add("userList");

    // Loopa igenom användarobjekten och skapa li-element för varje
    usersArray.forEach((user) => {
      // Skapa li-element och fyll det med användarinformation
      const listItem = document.createElement("li");
      // Styling baserat på användarens färg
      listItem.style.backgroundColor = user.color;
      listItem.style.color = "black"; // Vit text för tydlighet, justera efter behov

      // Lägg till övriga element för att organisera informationen
      const heading = document.createElement("div");
      heading.textContent = `User ID: ${user.id}`;
      heading.style.fontWeight = "bold";

      const name = document.createElement("div");
      name.textContent = `Name: ${user.firstName} ${user.lastName}`;

      const username = document.createElement("div");
      username.textContent = `Username: ${user.username}`;

      const color = document.createElement("div");
      color.textContent = `Color: ${user.color}`;

      // Lägg till övriga element i li-elementet
      listItem.appendChild(heading);
      listItem.appendChild(name);
      listItem.appendChild(username);
      listItem.appendChild(color);

      // Lägg till li-elementet i ul-elementet
      userList.appendChild(listItem);
    });
    // Lägg till ul-elementet i body eller där du vill ha det i DOM-trädet
    document.body.appendChild(userList);// Referera till den befintliga div med id "userListContainer"
    
    const userListContainer = document.getElementById("userListContainer");

    // Lägg till userList i userListContainer
    userListContainer.appendChild(userList);

    // Logga resultatet
    console.log(usersArray);
    console.log(jsonData);
  })
  .catch((error) => {
    // Hantera eventuella fel under hämtningen
    console.error("Fetch error:", error);
  });