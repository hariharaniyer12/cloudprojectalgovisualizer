function binarySearch(arr, g, r, x)
{
    if (r >= g)
    {
        let mid = Math.floor(g + (r-g) / 2);
        //update_bar(bar_div[g],"yellow",bar_len[g]);
        //update_bar(bar_div[mid],"yellow",bar_len[mid]);
        //update_bar(bar_div[r],"yellow",bar_len[r]);
        update_bar(bar_div[g],"orange",bar_len[g]);
        update_bar(bar_div[r],"orange",bar_len[r]);
        update_bar(bar_div[mid],"yellow",bar_len[mid]);
        //update_bar(bar_div[r],"orange",bar_len[r]);
   
        // If the element is present
        // at the middle itself
        if (arr[mid] == x){
        update_bar(bar_div[mid],"green",bar_len[mid]);
        return;
        }
   
        // If element is smaller than
        // mid, then it can only be 
        // present n left subarray
        if (arr[mid] > x){
        update_bar(bar_div[mid],"blue",bar_len[mid]);
        update_bar(bar_div[r],"blue",bar_len[r]);
            return binarySearch(arr, g, mid-1 , x);
        }
   
        // Else the element can only 
        // be present in right subarray
        update_bar(bar_div[g],"blue",bar_len[g]);
        update_bar(bar_div[mid],"blue",bar_len[mid]);
        return binarySearch(arr, mid + 1, r, x);
    }
   
    // We reach here when element
    // is not present in array
    update_bar(bar_div[0],"red",bar_len[0]);
}
  
 // Returns position of first
// occurrence of x in array
function exponentialSearch(arr, n, x)
{
       
    // If x is present at 
    // first location itself
    if (arr[0] == x){
        update_bar(bar_div[0],"green",bar_len[0]);
        return;
    }
    
    // Find range for binary search 
    // by repeated doubling
    let i = 1;
    update_bar(bar_div[1],"orange",bar_len[1]);
    while (i < n && arr[i] <= x){

        i = i * 2;
        update_bar(bar_div[i],"orange",bar_len[i]);
    }
    
   
    // Call binary search for
    // the found range.
    changeclr(i/2,Math.min(i, n - 1));
    binarySearch(arr, i/2, Math.min(i, n - 1), x);
}
function es(){
    let temmp=Math.floor(document.getElementById("modal-search").value);
    exponentialSearch(bar_len,total_size,temmp);
}
function changeclr(aa,bb){
    for(let w=aa;w<=bb;w++){
        update_bar(bar_div[w],"blue",bar_len[w]);
    }
    return;
}

