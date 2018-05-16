$(function () {

    const $orders = $('#orders');
    const $addButton = $('#add-order');
    const $name = $('#name');
    const $drink = $('#drink');

    // GET
    $.ajax({
        type: 'GET',
        url: 'http://rest.learncode.academy/api/pasquino/orders',
        success: function (orders) {
            // console.log('success', data);
            $.each(orders, function (i, order) {
                addOrder(order);
            });
        },
        error: function () {
            console.log('error loading order');
        }
    });

    // POST
    $addButton.on('click', function () {
        let order = {
            name: $name.val(),
            drink: $drink.val()
        };

        $.ajax({
            type: 'POST',
            url: 'http://rest.learncode.academy/api/pasquino/orders',
            data: order,
            success: function (newOrder) {
                addOrder(newOrder);
            },
            error: function () {
                console.log('error posting order');
            }
        })
    });

    // DELETE
    $orders.on('click', '.remove', function () {
        const $li = $(this).closest('li');
        $.ajax({
            type: 'DELETE',
            url: 'http://rest.learncode.academy/api/pasquino/orders/' + $(this).attr('data-id'),
            success: function () {

                $li.fadeOut(300, function () {
                    $(this).remove();
                });
            }
        });
    });

    // PUT

    // Edit Order
    $orders.on('click', '.editOrder', function () {
        const $li = $(this).closest('li');
        $li.find('input.name').val($li.find('span.name').html());
        $li.find('input.drink').val($li.find('span.drink').html());

        $li.addClass('edit');
    });

    // Cancel Edits
    $orders.on('click', '.cancelEdit', function () {
        $(this).closest('li').removeClass('edit');
    });

    // Save Edits
    $orders.on('click', '.saveEdit', function () {
        const $li = $(this).closest('li');
        const order = {
            name: $li.find('input.name').val(),
            drink: $li.find('input.drink').val()
        };

        $.ajax({
            type: 'PUT',
            url: 'http://rest.learncode.academy/api/pasquino/orders/' + $li.attr('data-id'),
            data: order,
            success: function (newOrder) {
                $li.find('span.name').html(order.name);
                $li.find('span.drink').html(order.drink);
                $li.removeClass('edit');
            },
            error: function () {
                console.log('error updating order');
            }
        })
    });

    // functions
    function addOrder(order) {
        $orders.append(
            `
            <li data-id="${order.id}">
            <p>
                <strong>Name:</strong>
                <span class="noedit name">${order.name}</span>
                <input class="edit name">
                <br>
                <strong>Drink:</strong> 
                <span class="noedit drink">${order.drink}</span>
                <input class="edit drink">
            </p>
            <button data-id="${order.id}" class="remove">Delete</button>
            <button class="editOrder noedit">Edit</button>
            <button class="saveEdit edit">Save</button>
            <button class="cancelEdit edit">Cancel</button>
            </li>
            `
        )
    }
});