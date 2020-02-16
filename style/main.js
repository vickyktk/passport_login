$(document).ready(function(){
    $('#delete').on('click',function(e){
        var prompt=confirm('Are you sure ??')
        if(prompt){
            $target=$(e.target)
         const id =$target.attr('data-id')

        $.ajax({
            type:'delete',
            url:'products/'+id,
            success:function(response){
                window.location.href='/products'
                alert('Product deleted')
            },
            error:function(err){
                console.log(err)
            }
        })
        }
    })
})