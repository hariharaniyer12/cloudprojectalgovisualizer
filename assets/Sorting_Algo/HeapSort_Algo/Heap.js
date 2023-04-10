function swap(id1, id2, col1, col2){
    update_bar(bar_div[id1],"red",bar_len[id1]);
    update_bar(bar_div[id2],"red",bar_len[id2]);
    [bar_len[id1], bar_len[id2]] = [bar_len[id2], bar_len[id1]];
    update_bar(bar_div[id1],col1,bar_len[id1]);
    if(id1!=id2) update_bar(bar_div[id2],col2,bar_len[id2]);
  }

function Heap(){
    for(let i=total_size/2-1;i>=0;i--) maxheapify(i,total_size);
    for(let i=total_size-1,heap_size=total_size-1;i>0;i--){
       swap(0,heap_size,"skyblue","green");
       maxheapify(0,heap_size--);
    }
    update_bar(bar_div[0],"green",bar_len[0]);
 }
 function maxheapify(id,size){
    let left = 2*id+1,right = 2*id+2,high=id;
    if(left<size && bar_len[left]>bar_len[high]) high=left;
    if(right<size && bar_len[right]>bar_len[high]) high=right;
    if(high!=id){
       swap(id,high,"pink","pink");
       maxheapify(high,size);
    }
 }