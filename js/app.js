$(document).ready(function() {
  function heightDetect() {
  	$('.price').css('min-height', $(window).height());
    $('.nav').height($(window).height());
    $('.competitor, .competitor__list').height($(window).height() / 2);
  };
  heightDetect();
  $(window).on('resize', function() {
  	heightDetect();
  });

  function menuOpen() {
  	$('.wrap').on('click', function() {
  		$(this).find('.menu').toggleClass('active');
  		if ($('.menu').hasClass('active')) {
  			$('.nav').css({'opacity': '1', 'visibility': 'visible'});
  		}
  		else {
  			$('.nav').css({'opacity': '0', 'visibility': 'hidden'});
  		}
  	});
  	$('.nav').on('click', function() {
  		console.log('ok');
  		$('.menu').removeClass('active');
  		$(this).css({'opacity': '0', 'visibility': 'hidden'});
  	});
  };
  menuOpen();

  function competitorList() {
  		$('.competitor__list').toggleClass('show');
  		if ($('.competitor__list').hasClass('show')) {
  			$('.competitor__list').append($('.content__btn'));
  			$('.content__btn').css({'top': 'auto', 'bottom': '-35px', 'left': '43%', 'transform': 'rotate(180deg)'});
  			$('.content__price, .calculate__item, .calculate__btn').css('z-index', '0');
  		}
  		else {
  			$('.content__item_other').append($('.content__btn'));
  			$('.content__btn').css({'top': '50%', 'bottom': 'auto', 'left': '35%', 'transform': 'rotate(0deg)'});
  			$('.content__price ,.calculate__item, .calculate__btn').css('z-index', '1');	
  		}
  };
  $('.content__btn').on('click', competitorList);

  function calcValue() {
  	var competitor;
  	$('.competitor__item').on('click', function() {
  		competitor = $(this).text();
  		$('.content__text_big').text(competitor);
  		$('.content__text_big').data('competitor', competitor);
  		$('.content__price').val('');
  		if ($('.content__text_big').data('competitor')) {
  			$('.content__price').addClass('show');
  			$('.calculate__item').removeAttr('disabled');
  		}
  		else {removeClass('show');}
  		competitorList();
  	});

  };
  calcValue();

  function focusDetect() {
  	$(this).val($(this).val().replace(' грн.', ''));
  	var self = $(this),
  			value = self.val();		
 		$('.content__price').on('click', function() {
 			if (self !== $(this)) {
 				self = $(this);
 			}
 		}); 			
  	$('.calculate__item').on('click', function() {
  		if ($(this).hasClass('calculate__item_cancel')) {
  			value = value.slice(0, -1);
  			self.val(value);
  			self.trigger('change'); 
  		}
  		else {
  			value += $(this).text();
  			self.val(value);
  			self.trigger('change');
  		};
  	});		
  };
  $('.content__price').on('blur', focusDetect);
  $('.content__price').on('change', function() {
  	var value = $(this).val();
  	if($(this).val()) {
  		$(this).val('');
  		$(this).val(value + ' грн.');
  	}
  	else $(this).val('');
  	if(($('.content__price').val() === '') || ($('.content__price_other').val() === '')) {
  		$('.calculate__btn').attr('disabled', '');
  	}
  	else {
  		$('.calculate__btn').removeAttr('disabled');
  		console.log($('.content__price_other').val());
  	}	
  });

  function validationVariables() {
  	var our_price = $('.content__price_our').val().replace(' грн.', ''),
  			other_price = $('.content__price_other').val().replace(' грн.', '');
  	$('.warning').removeClass('show');		
  	if (!$.isNumeric(our_price) || our_price <= 0 || our_price > 100000) {
  		$('.warning_our').addClass('show');
  	}
  	else if (!$.isNumeric(other_price) || other_price <= 0 || other_price > 100000) {
  		$('.warning_other').addClass('show');
  	}	
  	else if (+our_price > +other_price) {
  		$('.product__price_our').text(our_price + ' грн.');
  		$('.product__price_other').text(other_price + ' грн.');
  		$('.modal').addClass('show');
  		$('.product__quantity_our').text($('.content__item_our .content__text').text());	
  		$('.product__quantity_other').text($('.content__item_other .content__text').text());
  		$('.modal__percent').remove();
  		$('.modal__economy').text('Перевірте, можливо ви допустили помилку при вводі вартості упаковки');
  	}
  	else {
  		$('.product__price_our').text(our_price + ' грн.');
  		$('.product__price_other').text(other_price + ' грн.');
  		$('.modal').addClass('show');
  		$('.product__quantity_our').text($('.content__item_our .content__text').text());	
  		$('.product__quantity_other').text($('.content__item_other .content__text').text());
  		$('.modal__economy').text('Економія для пацієнта з Нашими ліками ').append($('<span></span>'));
  		$('.modal__economy span').text(other_price - our_price + ' грн');
  		$('.modal__footer').append($('<span class="modal__percent"></span>'));
  		$('.modal__percent').text(parseInt(((other_price - our_price) * 100) / other_price) + '%');
  	}

  };
  $('.calculate__btn').on('click', validationVariables);


  function cancelBtn() {
  	$('.modal__cancel').on('click', function(e) {
  		e.preventDefault();
  		$('.content__price').val('');
  		$('.calculate__btn').attr('disabled', '');
  		$(this).closest($('.modal')).removeClass('show');

  	});
  };
  cancelBtn();
});


