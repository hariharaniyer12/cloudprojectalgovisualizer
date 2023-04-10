function swap(id1, id2, col1, col2){
    update_bar(bar_div[id1],"red",bar_len[id1]);
    update_bar(bar_div[id2],"red",bar_len[id2]);
    [bar_len[id1], bar_len[id2]] = [bar_len[id2], bar_len[id1]];
    update_bar(bar_div[id1],col1,bar_len[id1]);
    if(id1!=id2) update_bar(bar_div[id2],col2,bar_len[id2]);
  }


function Insertion(){
    for(let i=1;i<total_size;i++){
       let j=i-1,key=i;
       update_bar(bar_div[i],"yellow",bar_len[key]);
       while(j>=0 && bar_len[j]>bar_len[key]){
          swap(j,key,"yellow","green");
          key=j--;
       }
       update_bar(bar_div[key],"green",bar_len[key]);
    }
 }