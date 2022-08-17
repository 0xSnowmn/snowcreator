
if (document.getElementById("div_tuxler_popup_bw____") == null) {
  var div = document.createElement("div");

  div.setAttribute('style', "right: 0px !important;top:-500px !important;z-index: 50000001 !important;position: fixed !important;");
  div.setAttribute("id", "div_tuxler_popup_bw____");

  let href = 'http://tuxler.com/extension_event.php?id=upgrade_premium_bandwidth';
  if (window._uniqueId) {
    href += '&app_unique_id=' + encodeURIComponent(window._uniqueId)
  }
  div.innerHTML = '<!-- ngView: --><div id="______DIV_36">	<div id="______DIV_37">		<div id="______DIV_38"><div id="____divclose"><div id="_____x"><a href="#"  onclick="javascript:document.getElementById(\'______DIV_36\').style.display=\'none\';return false;">X</a></div></div><h3 id="______H3_39">				Tuxler			</h3>		</div>		<div id="______DIV_42">			 			<label id="______LABEL_43">				Disconnected			</label>			<!-- ngIf: isConnected == false --><i id="______I_44"></i>			<!-- end ngIf: isConnected == false -->			<!-- ngIf: isConnected == true --><span id="______SPAN_45"></span>		</div>		<div id="______DIV_46">			<div id="______DIV_47">				<p id="______P_49">	You have been using connection speed at maximum capacity for over 30 seconds.<br /><br />				Do you need faster connection ? With Premium Version you get 4x boost.		<br />	</p>				<p id="______P_50">				           <a target="_BLANK" href="' + href + '" id="______A_1">Get Premium</a>				</p>			</div>		</div>	</div></div>';

  document.body.appendChild(div);

  var tuxler_popup_interval = setInterval(function () {

    var px = document.getElementById("div_tuxler_popup_bw____");
    var style = px;

    px = style.style.top;

    var tmp = parseInt(px, 10);

    if (tmp == 0)
      clearInterval(tuxler_popup_interval);
    else {
      tmp += 30;

      if (tmp > 0)
        tmp = 0;

      document.getElementById("div_tuxler_popup_bw____").style.top = (tmp) + "px";
    }

  }, 50);
}