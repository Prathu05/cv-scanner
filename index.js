
// Data is an array of object which contains info about candidate

function getData(){
     let url = 'https://randomuser.me/api/?results=10';
     fetch(url).then((response)=>{
          return response.json();
     }).then((data)=>{
          let userData = data.results;
          console.log(userData);

          function cvIterator(profiles){
               let nextIndex = 0;
               return {
                    next:function(){ 
                         if(nextIndex < profiles.length){
                              return {
                                   value: profiles[nextIndex++],
                                   done:false
                              }
                         }else{
                              return {
                                   done: true
                              }
                         }
                    }
               }
          }
          const candidates = cvIterator(userData);
          let nextBtn = document.getElementById('nextBtn');
          nextBtn.addEventListener('click', nextDetail);

          function nextDetail(){
               const currentCandiate = candidates.next().value;
               let image = document.getElementById('image');
               let profile = document.getElementById('profile');

               if(currentCandiate != undefined){
                    image.innerHTML = `<img class="avatar rounded-circle" src='${currentCandiate.picture.large}'>`
                    profile.innerHTML = `<h4 class="card-title">${currentCandiate.name.title} ${currentCandiate.name.first} ${currentCandiate.name.last}</h4>
                                   <h6 class="card-subtitle mb-2 text-muted">${currentCandiate.location.city}, ${currentCandiate.location.country}</h6>
                                   <ul>
                                        <li><strong>UserName</strong> : ${currentCandiate.login.username}</li>
                                        <li><strong>Email</strong> : ${currentCandiate.email} </li>
                                        <li><strong>Gender</strong> : ${currentCandiate.gender} </li>
                                        <li><strong>Age</strong> :  ${currentCandiate.dob.age}years </li>
                                        <li><strong>Mobile No</strong> : ${currentCandiate.cell} </li>
                                   </ul>`
               }else{
                    alert('End of Application');
                    window.location.reload()
               }

          }
          nextDetail()
     })
}
getData()