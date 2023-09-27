<!-- <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.no-icons.min.css" rel="stylesheet"> -->
<link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
    <?php
    
        $imageid = $_GET['id'];
    ?>
    <Form id="myform" name="myform" method="POST" action = "admin/ratings.php" >
            <Fieldset Class="Rating">
                <h3>Rate the Picture</h3>
                <ul class="rating-ul">
                    <li>
                        <input type="hidden" name="picture_id" value="<?php echo $imageid; ?>" />
                        <Input type="hidden" name="referer" value="<?php echo htmlspecialchars($_SERVER['REQUEST_URI']);?>" />
                    </li>
                    <li>
                        <Input class="rating-input" Type="Radio" Id="Rate1" Name="Rating" Value="1">
                        <Label For="Rate1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                        </Label>
                    </li>
                    <li>
                        <Input Type="Radio" Id="Rate2" Name="Rating" Value="2">
                        <Label For="Rate2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg></Label>
                        </Label>
                    </li>
                    <li>
                        <Input Type="Radio" Id="Rate3" Name="Rating" Value="3">
                        <Label For="Rate3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg></Label>
                        </Label>
                    </li>
                    <li>
                        <Input Type="Radio" Id="Rate4" Name="Rating" Value="4">
                        <Label For="Rate4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg></Label>
                        </Label>
                    </li>
                    <li>
                        <Input Type="Radio" Id="Rate5" Name="Rating" Value="5">
                        <Label For="Rate5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg></Label>
                        </Label>
                    </li>
                </ul>
            </Fieldset>
            <input type="submit" name="submit" class="btn btn-info btn-ratings" value="Submit">
    </Form>
<script>
    $('li').on('click',function(){
        $('li').removeClass('active');
        $('li').removeClass('secondary-active');
        $(this).addClass('active');
        $(this).prevAll().addClass('secondary-active');

    })
</script>