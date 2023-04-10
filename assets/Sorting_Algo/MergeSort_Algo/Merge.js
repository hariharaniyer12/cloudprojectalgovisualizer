
function Merge(low=0, high=total_size-1){
   // console.log("Starting merge function.....");
   // console.log(low);
   // console.log(high);
    if(low<high){
       let mid=Math.floor((low+high)/2);
       update_bar(bar_div[mid], "yellow", bar_len[mid]);
       Merge(low, mid);
       Merge(mid+1, high);
       combine(low, mid, high);
       
    }
 }
 
 function combine(low, mid, high){
   // console.log("hwllooo");
    const arr=[];
    let a=low, b=mid+1, c=0;
    while(a<=mid && b<=high){
      if(bar_len[a] < bar_len[b])
      {
         // console.log(bar_len[a]);
         // console.log( "<" );
         // console.log(bar_len[b]);
         update_bar(bar_div[a],"red",bar_len[a]);
         arr[c++]=bar_len[a++];
      }
      else 
      {
         // var maxsum = Math.max(bar_len[a],bar_len[b]);
         // console.log(maxsum);
         // console.log(bar_len[a]);
         // console.log( ">" );
         // console.log(bar_len[b]);
         update_bar(bar_div[b],"red",bar_len[b]);
         arr[c++]=bar_len[b++];
      }
    }
    while(a<=mid){
       update_bar(bar_div[a],"red",bar_len[a]);
       arr[c++]=bar_len[a++];
    }
    while(b<=high){
       update_bar(bar_div[b],"red",bar_len[b]);
       arr[c++]=bar_len[b++];
    }
   //  console.log(arr);
    for(let i=low;i<=high;i++){
       bar_len[i]=arr[i-low];
       update_bar(bar_div[i],"green",bar_len[i]);
    }
    //console.log(arr);
 }

