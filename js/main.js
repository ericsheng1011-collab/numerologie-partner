(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var form = document.getElementById('partner-inquiry');
  if (!form) return;

  var lang = form.getAttribute('data-lang') === 'ja' ? 'ja' : 'en';
  var copy = lang === 'ja' ? {
    inquiry_type: 'お問い合わせ種別を選択してください。',
    name: '氏名を入力してください。',
    email: '有効なビジネスメールを入力してください。',
    company: '会社名を入力してください。',
    territory: '担当エリアまたは店舗所在地を入力してください。',
    message: 'メッセージを入力してください。',
    privacy: 'プライバシーに関する同意が必要です。',
    fast: '送信まで少し時間を置いてから、もう一度お試しください。',
    unconfigured: 'このフォームはまだブランドの受信トレイに接続されていないため、メッセージは送信されていません。ericsheng1011@gmail.com まで直接メールでご連絡ください。',
    network: '送信できませんでした。しばらくしてから再度お試しいただくか、ericsheng1011@gmail.com までメールでご連絡ください。',
    success: 'ありがとうございます。お問い合わせを受け付けました。ご記入のビジネスメール宛にご連絡します。'
  } : {
    inquiry_type: 'Choose an inquiry type.',
    name: 'Enter your full name.',
    email: 'Enter a valid business email.',
    company: 'Enter your company.',
    territory: 'Enter a territory or store location.',
    message: 'Enter a message.',
    privacy: 'Please confirm the privacy notice.',
    fast: 'Please wait a moment, then send the form again.',
    unconfigured: 'This form is not connected to the brand inbox yet, so your message was not sent. Please email ericsheng1011@gmail.com directly.',
    network: 'We could not send your inquiry. Please try again, or email ericsheng1011@gmail.com.',
    success: 'Thank you. Your inquiry has been submitted. We will reply to the business email you provided.'
  };

  var status = document.getElementById('form-status');
  var submitBtn = form.querySelector('[type="submit"]');
  var openedAt = Date.now();
  var requiredIds = ['inquiry_type', 'name', 'email', 'company', 'territory', 'message', 'privacy'];
  requiredIds.forEach(function (id) {
    var described = document.getElementById(id);
    if (described) described.setAttribute('aria-describedby', id + '-error');
  });

  var params = new URLSearchParams(window.location.search);
  var preset = params.get('inquiry');
  var inquiry = form.elements.namedItem('inquiry_type');
  if (inquiry && preset && ['rep', 'retail', 'other'].indexOf(preset) !== -1) {
    inquiry.value = preset;
  }

  var config = window.NUMEROLOGIE_FORM || {};
  var keyInput = form.elements.namedItem('access_key');
  if (keyInput && config.accessKey) keyInput.value = config.accessKey;

  function clearErrors() {
    var invalid = form.querySelectorAll('.is-invalid');
    for (var i = 0; i < invalid.length; i++) invalid[i].classList.remove('is-invalid');
    var messages = form.querySelectorAll('.field-error');
    for (var j = 0; j < messages.length; j++) messages[j].textContent = '';
    requiredIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.removeAttribute('aria-invalid');
    });
    var privacy = document.getElementById('privacy');
    if (privacy) privacy.removeAttribute('aria-invalid');
  }

  function setFieldError(id, message) {
    var el = document.getElementById(id);
    var slot = document.getElementById(id + '-error');
    var wrap = el ? el.closest('.form-field') : null;
    if (wrap) wrap.classList.add('is-invalid');
    if (el) el.setAttribute('aria-invalid', 'true');
    if (slot) slot.textContent = message;
  }

  function showStatus(kind, message) {
    if (!status) return;
    status.hidden = false;
    status.className = 'form-status is-' + kind;
    status.textContent = message;
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener('input', function (event) {
    var target = event.target;
    if (!target || !target.id) return;
    var wrap = target.closest('.form-field');
    if (wrap) wrap.classList.remove('is-invalid');
    target.removeAttribute('aria-invalid');
    var slot = document.getElementById(target.id + '-error');
    if (slot) slot.textContent = '';
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    clearErrors();
    if (status) status.hidden = true;

    var firstInvalid = null;
    function fail(id, message) {
      setFieldError(id, message);
      if (!firstInvalid) firstInvalid = document.getElementById(id);
    }

    var inquiryType = (form.elements.namedItem('inquiry_type') || {}).value || '';
    var name = ((form.elements.namedItem('name') || {}).value || '').trim();
    var email = ((form.elements.namedItem('email') || {}).value || '').trim();
    var company = ((form.elements.namedItem('company') || {}).value || '').trim();
    var territory = ((form.elements.namedItem('territory') || {}).value || '').trim();
    var message = ((form.elements.namedItem('message') || {}).value || '').trim();
    var privacy = form.elements.namedItem('privacy');
    var botcheck = form.elements.namedItem('botcheck');

    if (!inquiryType) fail('inquiry_type', copy.inquiry_type);
    if (!name) fail('name', copy.name);
    if (!validEmail(email)) fail('email', copy.email);
    if (!company) fail('company', copy.company);
    if (!territory) fail('territory', copy.territory);
    if (!message) fail('message', copy.message);
    if (!privacy || !privacy.checked) fail('privacy', copy.privacy);

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    if (botcheck && botcheck.checked) {
      showStatus('success', copy.success);
      form.reset();
      return;
    }

    if (Date.now() - openedAt < 2000) {
      showStatus('error', copy.fast);
      return;
    }

    var key = (config.accessKey || '').trim();
    var placeholder = !key || key === 'YOUR_WEB3FORMS_ACCESS_KEY' || key.indexOf('YOUR_') === 0;
    if (placeholder) {
      showStatus('error', copy.unconfigured);
      return;
    }

    if (keyInput) keyInput.value = key;
    if (submitBtn) submitBtn.disabled = true;

    var data = new FormData(form);
    data.set('access_key', key);
    data.set('name', name);
    data.set('email', email);
    data.set('company', company);
    data.set('territory', territory);
    data.set('message', message);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: data
    }).then(function (res) {
      return res.json().then(function (body) {
        return { ok: res.ok, body: body || {} };
      }).catch(function () {
        return { ok: false, body: {} };
      });
    }).then(function (result) {
      if (result.ok && result.body.success) {
        showStatus('success', copy.success);
        form.reset();
        if (keyInput) keyInput.value = key;
        return;
      }
      var detail = result.body && result.body.message ? ' ' + result.body.message : '';
      showStatus('error', copy.network + detail);
    }).catch(function () {
      showStatus('error', copy.network);
    }).then(function () {
      if (submitBtn) submitBtn.disabled = false;
    });
  });
})();
