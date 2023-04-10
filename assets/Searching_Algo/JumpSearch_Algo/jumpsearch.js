function js(){
    function jumpSearch(arr,x, n)
    {
        // Finding block size to be jumped
        let step = Math.floor(Math.sqrt(n));
    
        // Finding the block where element is
        // present (if it is present)
        let prev = 0;
        update_bar(bar_div[0],"orange",bar_len[0]);
        while (arr[min(step, n)-1] < x)
        {
            prev = step;
            update_bar(bar_div[step],"orange",bar_len[step]);
            //update_bar(bar_div[prev],"skyblue",bar_len[prev]);
            step += Math.floor(Math.sqrt(n));
            update_bar(bar_div[step],"orange",bar_len[step]);
            if (prev >= n){
            update_bar(bar_div[0],"red",bar_len[0]);
            return;
            }
        }
     
        // Doing a linear search for x in block
        // beginning with prev.
        while (arr[prev] < x)
        {
            prev++;
            update_bar(bar_div[prev],"yellow",bar_len[prev]);
     
            // If we reached next block or end of
            // array, element is not present.
            if (prev == min(step, n)){
            update_bar(bar_div[prev],"red",bar_len[prev]);
            return;
            }
        }
        // If element is found
        if (arr[prev] == x){
        update_bar(bar_div[prev],"green",bar_len[prev]);
        return;
        }
     
        update_bar(bar_div[prev],"red",bar_len[prev]);
    }
    function min(xx,yy){
    if(xx<yy){
        return xx;
    }
    else{
        return yy;
    }
    }
    let temmp=Math.floor(document.getElementById("modal-search").value);
    jumpSearch(bar_len,temmp,total_size);
    }