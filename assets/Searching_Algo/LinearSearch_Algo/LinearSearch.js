function linearsearch(){
  let temmp=Math.floor(document.getElementById("modal-search").value);
    for(let i=0;i<total_size;i++){
         // changing To yellow color.
         update_bar(bar_div[i],"yellow",bar_len[i]);
         //if(bar_len[i]!=temmp){ 
             //Changing to red color as it is wrong.
         //  update_bar(bar_div[i],"red",bar_len[i]);
         //}
         if(bar_len[i]==temmp){ 
            // Changing to green color as it is correct.
            update_bar(bar_div[i],"green",bar_len[i]);
            return;
         }
         // need to change back its color.
         //update_bar(bar_div[i],"skyblue",bar_len[i]);
   }
   update_bar(bar_div[total_size-1],"red",bar_len[total_size-1]);
}