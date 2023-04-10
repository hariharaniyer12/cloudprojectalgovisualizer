let Binarysearch = function (){
    let recursiveFunction = function (arr, x, start, end) {
          
        // Base Condition
        if (start > end){
            update_bar(bar_div[0],"red",bar_len[0]);
            return;
        } //return false;
        chgclr(start,end);
        // Find the middle index
        let mid=Math.floor((start + end)/2);
        update_bar(bar_div[start],"orange",bar_len[start]);
        update_bar(bar_div[end],"orange",bar_len[end]);
        update_bar(bar_div[mid],"yellow",bar_len[mid]);
      
        // Compare mid with given key x
        if (bar_len[mid]===x){
            update_bar(bar_div[mid],"green",bar_len[mid]);
            return;
        }
         //return true;
        //update_bar(bar_div[start],"skyblue",bar_len[start]);
       // update_bar(bar_div[mid],"skyblue",bar_len[mid]);
        //update_bar(bar_div[end],"skyblue",bar_len[end]);
             
        // If element at mid is greater than x,
        // search in the left half of mid
        let temppp=bar_len[mid];
        if(temppp > x){
            chgclr2(mid,end);
            //update_bar(bar_div[end],"skyblue",bar_len[end]);
            //update_bar(bar_div[mid],"skyblue",bar_len[mid]);
            return recursiveFunction(arr, x, start, mid-1);
        }
        else{
            chgclr2(start,mid);
            //update_bar(bar_div[start],"skyblue",bar_len[start]);   
            //update_bar(bar_div[mid],"skyblue",bar_len[mid]);  
            // If element at mid is smaller than x,
            // search in the right half of mid
            return recursiveFunction(arr, x, mid+1, end);
        }
    }
    let temmp=Math.floor(document.getElementById("modal-search").value);
    recursiveFunction(bar_div, temmp, 0, total_size-1);
    }
    function chgclr2(aa,bb){
        for(let i=aa;i<=bb;i++){
            update_bar(bar_div[i],"skyblue",bar_len[i]);
        }
    }
    function chgclr(aa,bb){
        for(let i=aa;i<=bb;i++){
            update_bar(bar_div[i],"blue",bar_len[i]);
        }
    }
