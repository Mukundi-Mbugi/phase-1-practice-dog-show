document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/dogs")
    .then((resp) => resp.json())
    .then((dogs) => {
      dogs.forEach((dog) => {
        let parentDivElement = document.getElementById("table-body");
        let dogNameElement = document.createElement("td");
        let dogBreedElement = document.createElement("td");
        let dogSexElement = document.createElement("td");
        let dogDivElement = document.createElement("tr");
        let editButton = document.createElement("button");

        parentDivElement.appendChild(dogDivElement);
        dogDivElement.appendChild(dogNameElement);
        dogDivElement.appendChild(dogBreedElement);
        dogDivElement.appendChild(dogSexElement);
        dogDivElement.appendChild(editButton);

        dogNameElement.innerText = dog.name;
        dogBreedElement.innerText = dog.breed;
        dogSexElement.innerText = dog.sex;
        editButton.innerText = "Edit dog";
        editButton.dataset.id = dog.id;

        editButton.addEventListener("click", editDog);

        function editDog(e) {
          var dogId = e.target.dataset.id;
          

          fetch(`http://localhost:3000/dogs/${dogId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(),
          })
            .then((res) => res.json())
            .then((data) => {
              
              let form = document.getElementById("dog-form");
              // let dogId = e.target.dataset.id
              form.dataset.id = data.id;
              form.name.value = data.name;
              form.breed.value = data.breed;
              form.sex.value = data.sex;
            });


            const form =document.querySelector('#dog-form')
            const updateButton = document.querySelector('#update')
      updateButton.addEventListener('click',updateItem)

            function updateItem(e){
                e.preventDefault()
                // let dogId = e.target.dataset.id;
                console.log(dogId)
      
                fetch(`http://localhost:3000/dogs/${dogId}`, {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(),
                })
      
                .then(res=>res.json())
                .then(data=>{
                  data.name=form.children[0].name.value;
                  console.log(data);
      
      
      
                })
                
            }
        }

        
      });

      
    });


    

      
});
