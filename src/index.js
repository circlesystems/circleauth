/*
 * unicauth
 *  # Signature We use [digital signatures](https://en.wikipedia.org/wiki/Digital_signature) to avoid [man-in-the-middle attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack), every call or response has a signature that can be validated to ensure the data came from the trusted part.  #### Read and Write Keys <p>These keys are used for signing and verifying the requests/responses. The <u>Write Key is used when you send</u>   information to the API, so the API is sure that you are making the request. The <u>Read Key is used to verify   the information received</u> from the API, so you can be sure that the information was not altered.</p>  #### Getting the Query String Data To generate a signature for the URL's Query String you need to get all the Query String starting from `?` and ignoring the final `&signature={signatureData}`.  Example:<br> ```https://unicauth.com/api/session/?s=session2qs3gABWMRwsFD7nhW5QndSYpmDpi18Ry&signature=Se8SkYSkrMegn9Ydea8aFKzygR037D3lLg5OxUwSSYg=```<br><br> For this URL the data to encode is:<br> ``` const dataToEncrypt = \"?s=session2qs3gABWMRwsFD7nhW5QndSYpmDpi18Ry\"; ``` <br>  #### Getting the JSON Data To generate a signature for the JSON you need to get all the information inside the ```data``` key. This data must not be formatted.  Example:<br> ```{\"data\":{\"returnUrl\":\"https://circleaccess.circlesecurity.ai/demo/\",\"question\":\"Allow this operation?\",\"customID\":\"any-custom-data\",\"userID\":\"6a731465539d9ca2776fdeec709bce4ac5a420426a803b0dc937521352972b8b\"},\"signature\":\"7OQSfVnOzkvuyqtasb8J+q/3os/u85R3X1UoKQxtRRE=\"}```<br><br> For this URL the data to encode is:<br> ``` const dataToEncrypt = JSON.stringify(json.data); ``` <br>  #### Signing the Data After getting the data, you can generate the signature by using ```HMAC SHA256 Base64``` encoding like the Node.js example bellow: ``` const crypto = require('crypto');  // {key} Use writeKey when sending data to Circle Auth. Use readKey when reading data received from Circle Auth. const hash = crypto.createHmac('sha256', \"{key}\").update(dataToEncrypt).digest('base64'); ```  For more ```HMAC SHA256 Base64``` examples please visit [Joe Kampschmidt's Code](https://www.jokecamp.com/blog/examples-of-creating-base64-hashes-using-hmac-sha256-in-different-languages/) or [Google Maps URL Signing Samples](http://googlemaps.github.io/url-signing/index.html).<br> For online crypto testing you can visit [DevLang](https://www.devglan.com/online-tools/hmac-sha256-online) and use *Output Text Format* as *Base64*.  # Errors The API uses standard HTTP status codes to indicate the success or failure of the API call. The body of the response will be JSON in the following format: ``` {   \"error\": \"something went wrong\" } ```  # Login Authentication To authenticate using Circle Auth you can just open the `Login URL` provided to you when you create a new Application in our [Console](https://console.unicauth.com).<br> Here is one example of `Login URL`: ``` https://unicauth.com/login/app9KrRWQS9DjtpzNgWcbHNt68S7Y1DfUJJV ```  #### Data Return <section id=\"section-auth-return\">   <p class=\"mt-3\">After calling the <code>Login URL</code> and accepting the login on Circle Auth App, the page will be redirected to the <code>returnUrl</code> configured on our <a href=\"https://console.unicauth.com\">Console</a>.</p>   <p>Here is one example of a redirected URL:</p>   <div>     <div class=\"bd-clipboard\"><button type=\"button\" class=\"btn-clipboard\" title=\"\" data-bs-original-title=\"Copy to clipboard\">Copy</button></div>     <pre><code id=\"codeRedirectedUrl\" class=\"language-uri word-break\">https://circleaccess.circlesecurity.ai/demo/?<span class=\"token tag\">userID</span>=<span class=\"token attr-value\">6a731465539d9ca2776fdeec709bce4ac5a420426a803b0dc937521352972b8b</span>&<span class=\"token tag\">sessionID</span>=<span class=\"token attr-value\">session2U6ZYCXhqdgB2RH7vrKF1iwox7arXiotC</span>&<span class=\"token tag\">authID</span>=<span class=\"token attr-value\">authRNozDyooWYpTQyvGpNdbtTRc9wESs96T</span>&<span class=\"token tag\">type</span>=<span class=\"token attr-value\">login</span>&<span class=\"token tag\">signature</span>=<span class=\"token attr-value\">toHO3MTtz6/W3sL8y20vRTMa90z/IwYCiGLacTLHE5c=</span></code></pre>   </div>    <h5 id=\"auth-validate-signature\" class=\"mt-5\">Validating the Signature<a class=\"anchorjs-link \" aria-label=\"Anchor\" data-anchorjs-icon=\"#\" href=\"#auth-validate-signature\"></a></h5>    <p class=\"mt-3\">This validation uses the data from the returned URL above and apply the code from the <a href=\"#section/Signature\">Signature</a> section.</p>   <div>   <div class=\"bd-clipboard\"><button type=\"button\" class=\"btn-clipboard\" title=\"\" data-bs-original-title=\"Copy to clipboard\">Copy</button></div>   <pre><code id=\"codeCheckSignature\" class=\"language-js\">var crypto = require('crypto'); // {readKey} Use your readKey available at Console. const hash = crypto.createHmac('sha256', '{readKey}')   .update('?userID=6a731465539d9ca2776fdeec709bce4ac5a420426a803b0dc937521352972b8b&sessionID=session2U6ZYCXhqdgB2RH7vrKF1iwox7arXiotC&authID=authRNozDyooWYpTQyvGpNdbtTRc9wESs96T&type=login')   .digest('base64'); //validate if signatures are equals if (hash === 'toHO3MTtz6/W3sL8y20vRTMa90z/IwYCiGLacTLHE5c=') {   //do your stuff }</code></pre>   </div> </section> <br><br>  #### Styling <section id=\"section-auth-styling\">   <p>Here are the styles to be used for the Circle Auth login button:</p>   <ul class=\"nav nav-tabs\" id=\"nav-tab\" role=\"tablist\">     <li class=\"nav-item\">       <a class=\"nav-link active\" id=\"nav-darktheme-tab\" data-toggle=\"tab\" href=\"#nav-darktheme\" role=\"tab\" aria-controls=\"nav-darktheme\" aria-selected=\"true\">Dark Theme</a>     </li>     <li class=\"nav-item\">       <a class=\"nav-link\" id=\"nav-lighttheme-tab\" data-toggle=\"tab\" href=\"#nav-lighttheme\" role=\"tab\" aria-controls=\"nav-lighttheme\" aria-selected=\"false\">Light Theme</a>     </li>   </ul>   <div class=\"tab-content\" id=\"nav-tabContent\">     <div class=\"tab-pane fade show active\" id=\"nav-darktheme\" role=\"tabpanel\" aria-labelledby=\"nav-darktheme-tab\">       <div class=\"bd-example\">         <button class=\"unicauth-ui-button unicauth-ui-button-dark\"><span class=\"unicauth-ui-icon-wrapper\"><img class=\"unicauth-ui-icon\" alt=\"\" src=\"https://circleaccess.circlesecurity.ai/files/logo.svg\"></span><span class=\"unicauth-ui-text unicauth-ui-text-long\">Login with Circle Auth</span><span class=\"unicauth-ui-text unicauth-ui-text-short\">Circle Auth</span></button>       </div>       <div>         <div class=\"bd-clipboard\"><button type=\"button\" class=\"btn-clipboard\" title=\"\" data-bs-original-title=\"Copy to clipboard\">Copy</button></div>         <pre class=\"no-gap\"><code class=\"language-markup line-break\"><xmp><button class=\"unicauth-ui-button unicauth-ui-button-dark\"><span class=\"unicauth-ui-icon-wrapper\"><img class=\"unicauth-ui-icon\" alt=\"\" src=\"https://circleaccess.circlesecurity.ai/files/logo.svg\"></span><span class=\"unicauth-ui-text unicauth-ui-text-long\">Login with Circle Auth</span><span class=\"unicauth-ui-text unicauth-ui-text-short\">Circle Auth</span></button></xmp></code></pre>       </div>     </div>     <div class=\"tab-pane fade\" id=\"nav-lighttheme\" role=\"tabpanel\" aria-labelledby=\"nav-lighttheme-tab\">       <div class=\"bd-example\">         <button class=\"unicauth-ui-button unicauth-ui-button-light\"><span class=\"unicauth-ui-icon-wrapper\"><img class=\"unicauth-ui-icon\" alt=\"\" src=\"https://circleaccess.circlesecurity.ai/files/logo.svg\"></span><span class=\"unicauth-ui-text unicauth-ui-text-long\">Login with Circle Auth</span><span class=\"unicauth-ui-text unicauth-ui-text-short\">Circle Auth</span></button>       </div>       <div>         <div class=\"bd-clipboard\"><button type=\"button\" class=\"btn-clipboard\" title=\"\" data-bs-original-title=\"Copy to clipboard\">Copy</button></div>         <pre class=\"no-gap\"><code class=\"language-markup line-break\"><xmp><button class=\"unicauth-ui-button unicauth-ui-button-light\"><span class=\"unicauth-ui-icon-wrapper\"><img class=\"unicauth-ui-icon\" alt=\"\" src=\"https://circleaccess.circlesecurity.ai/files/logo.svg\"></span><span class=\"unicauth-ui-text unicauth-ui-text-long\">Login with Circle Auth</span><span class=\"unicauth-ui-text unicauth-ui-text-short\">Circle Auth</span></button></xmp></code></pre>       </div>     </div>   </div>   <p>The styles used in these examples can be found <a href=\"../demo/files/unicauth-ui.css\">here</a>.</p> </section>  # Factor Authentication The call to authenticate the factor is similar to the [Login Authenticatication](#section/Login-Authentication), but you have to use the `data.factorUrl` returned from the [2FA creation](#operation/Create2FA).  ##### Calling the `factorUrl` After creating the factor authentication, you will receive the `factorUrl` to be opened by the user for his acceptance.<br>  ##### Data Return After the user accepts the factor authentication on Circle Auth App, the page will be redirected to the `returnUrl` with the [parameters](#operation/2FAWebhook) (check the [2FA creation](#operation/Create2FA) section for the `returnUrl` creation). <p>Here is one example of the redirected URL:</p> <div>   <div class=\"bd-clipboard\"><button type=\"button\" class=\"btn-clipboard\" title=\"\" data-bs-original-title=\"Copy to clipboard\">Copy</button></div>   <pre><code id=\"codeRedirectedUrl2fa\" class=\"language-uri word-break\">https://circleaccess.circlesecurity.ai/demo/?<span class=\"token tag\">userID</span>=<span class=\"token attr-value\">6a731465539d9ca2776fdeec709bce4ac5a420426a803b0dc937521352972b8b</span>&<span class=\"token tag\">sessionID</span>=<span class=\"token attr-value\">session5mCrfGYEW7zJ68i7zwUhBuBxNiYpABobw</span>&<span class=\"token tag\">authID</span>=<span class=\"token attr-value\">authPT9zzReqtp5Sq4ogEaNmP1tsrtm1ssmsQ</span>&<span class=\"token tag\">type</span>=<span class=\"token attr-value\">twoFactor</span>&<span class=\"token tag\">customID</span>=<span class=\"token attr-value\">any-custom-data</span>&<span class=\"token tag\">signature</span>=<span class=\"token attr-value\">69XzMPOPuAStHcMJub4LaC56u8cnYyiZH+C7cteIed0=</span></code></pre> </div> <p></p> 
 *
 * OpenAPI spec version: 1.0.0
 * Contact: info@unicauth.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 3.0.26
 *
 * Do not edit the class manually.
 *
 */
import {ApiClient} from './ApiClient.js';
import {Create2FARequest} from './model/Create2FARequest.js';
import {Create2FAResponse} from './model/Create2FAResponse.js';
import {ExpireUserSessionRequest} from './model/ExpireUserSessionRequest.js';
import {ExpireUserSessionRequestData} from './model/ExpireUserSessionRequestData.js';
import {ExpireUserSessionResponse} from './model/ExpireUserSessionResponse.js';
import {ExpireUserSessionResponseData} from './model/ExpireUserSessionResponseData.js';
import {GetSessionResponse} from './model/GetSessionResponse.js';
import {GetSessionResponseData} from './model/GetSessionResponseData.js';
import {GetUserSessionResponse} from './model/GetUserSessionResponse.js';
import {GetUserSessionResponseData} from './model/GetUserSessionResponseData.js';
import {Model2FARequestData} from './model/Model2FARequestData.js';
import {Model2FAResponseData} from './model/Model2FAResponseData.js';
import {ResponseError} from './model/ResponseError.js';
import {CircleAuthApi} from './api/CircleAuthApi.js';

/**
* _SignatureWe_use__digital_signatures_httpsen_wikipedia_orgwikiDigital_signature_to_avoid__man_in_the_middle_attacks_httpsen_wikipedia_orgwikiMan_in_the_middle_attack_every_call_or_response_has_a_signature_that_can_be_validated_to_ensure_the_data_came_from_the_trusted_part__Read_and_Write_KeyspThese_keys_are_used_for_signing_and_verifying_the_requestsresponses__The_uWrite_Key_is_used_when_you_sendu__information_to_the_API_so_the_API_is_sure_that_you_are_making_the_request__The_uRead_Key_is_used_to_verify__the_information_receivedu_from_the_API_so_you_can_be_sure_that_the_information_was_not_altered_p_Getting_the_Query_String_DataTo_generate_a_signature_for_the_URLs_Query_String_you_need_to_get_all_the_Query_String_starting_from__and_ignoring_the_final_signaturesignatureData_Examplebrhttpsunicauth_comapisessionssession2qs3gABWMRwsFD7nhW5QndSYpmDpi18RysignatureSe8SkYSkrMegn9Ydea8aFKzygR037D3lLg5OxUwSSYgbrbrFor_this_URL_the_data_to_encode_isbrconst_dataToEncrypt__ssession2qs3gABWMRwsFD7nhW5QndSYpmDpi18Rybr_Getting_the_JSON_DataTo_generate_a_signature_for_the_JSON_you_need_to_get_all_the_information_inside_the_data_key__This_data_must_not_be_formatted_ExamplebrdatareturnUrlhttpsunicauth_comalphademoquestionAllow_this_operationcustomIDany_custom_datauserID6a731465539d9ca2776fdeec709bce4ac5a420426a803b0dc937521352972b8bsignature7OQSfVnOzkvuyqtasb8Jq3osu85R3X1UoKQxtRREbrbrFor_this_URL_the_data_to_encode_isbrconst_dataToEncrypt__JSON_stringify_json_databr_Signing_the_DataAfter_getting_the_data_you_can_generate_the_signature_by_using_HMAC_SHA256_Base64_encoding_like_the_Node_js_example_bellowconst_crypto__require_crypto_key_Use_writeKey_when_sending_data_to_Unic_Auth__Use_readKey_when_reading_data_received_from_Unic_Auth_const_hash__crypto_createHmac_sha256_key_update_dataToEncrypt_digest_base64For_more_HMAC_SHA256_Base64_examples_please_visit__Joe_Kampschmidts_Code_httpswww_jokecamp_comblogexamples_of_creating_base64_hashes_using_hmac_sha256_in_different_languages_or__Google_Maps_URL_Signing_Samples_httpgooglemaps_github_iourl_signingindex_html_brFor_online_crypto_testing_you_can_visit__DevLang_httpswww_devglan_comonline_toolshmac_sha256_online_and_use_Output_Text_Format_as_Base64__ErrorsThe_API_uses_standard_HTTP_status_codes_to_indicate_the_success_or_failure_of_the_API_call__The_body_of_the_response_will_be_JSON_in_the_following_format__error_something_went_wrong_Login_AuthenticationTo_authenticate_using_Unic_Auth_you_can_just_open_the_Login_URL_provided_to_you_when_you_create_a_new_Application_in_our__Console_httpsconsole_unicauth_com_brHere_is_one_example_of_Login_URLhttpsunicauth_comloginapp9KrRWQS9DjtpzNgWcbHNt68S7Y1DfUJJV_Data_Returnsection_idsection_auth_return__p_classmt_3After_calling_the_codeLogin_URLcode_and_accepting_the_login_on_Unic_Auth_App_the_page_will_be_redirected_to_the_codereturnUrlcode_configured_on_our_a_hrefhttpsconsole_unicauth_comConsolea_p__pHere_is_one_example_of_a_redirected_URLp__div____div_classbd_clipboardbutton_typebutton_classbtn_clipboard_title_data_bs_original_titleCopy_to_clipboardCopybuttondiv____precode_idcodeRedirectedUrl_classlanguage_uri_word_breakhttpsunicauth_comalphademospan_classtoken_taguserIDspanspan_classtoken_attr_value6a731465539d9ca2776fdeec709bce4ac5a420426a803b0dc937521352972b8bspanspan_classtoken_tagsessionIDspanspan_classtoken_attr_valuesession2U6ZYCXhqdgB2RH7vrKF1iwox7arXiotCspanspan_classtoken_tagauthIDspanspan_classtoken_attr_valueauthRNozDyooWYpTQyvGpNdbtTRc9wESs96Tspanspan_classtoken_tagtypespanspan_classtoken_attr_valueloginspanspan_classtoken_tagsignaturespanspan_classtoken_attr_valuetoHO3MTtz6W3sL8y20vRTMa90zIwYCiGLacTLHE5cspancodepre__div__h5_idauth_validate_signature_classmt_5Validating_the_Signaturea_classanchorjs_link__aria_labelAnchor_data_anchorjs_icon_hrefauth_validate_signatureah5__p_classmt_3This_validation_uses_the_data_from_the_returned_URL_above_and_apply_the_code_from_the_a_hrefsectionSignatureSignaturea_section_p__div__div_classbd_clipboardbutton_typebutton_classbtn_clipboard_title_data_bs_original_titleCopy_to_clipboardCopybuttondiv__precode_idcodeCheckSignature_classlanguage_jsvar_crypto__require_crypto_readKey_Use_your_readKey_available_at_Console_const_hash__crypto_createHmac_sha256_readKey___update_userID6a731465539d9ca2776fdeec709bce4ac5a420426a803b0dc937521352972b8bsessionIDsession2U6ZYCXhqdgB2RH7vrKF1iwox7arXiotCauthIDauthRNozDyooWYpTQyvGpNdbtTRc9wESs96Ttypelogin___digest_base64validate_if_signatures_are_equalsif__hash__toHO3MTtz6W3sL8y20vRTMa90zIwYCiGLacTLHE5c___do_your_stuffcodepre__divsectionbrbr_Stylingsection_idsection_auth_styling__pHere_are_the_styles_to_be_used_for_the_Unic_Auth_login_buttonp__ul_classnav_nav_tabs_idnav_tab_roletablist____li_classnav_item______a_classnav_link_active_idnav_darktheme_tab_data_toggletab_hrefnav_darktheme_roletab_aria_controlsnav_darktheme_aria_selectedtrueDark_Themea____li____li_classnav_item______a_classnav_link_idnav_lighttheme_tab_data_toggletab_hrefnav_lighttheme_roletab_aria_controlsnav_lighttheme_aria_selectedfalseLight_Themea____li__ul__div_classtab_content_idnav_tabContent____div_classtab_pane_fade_show_active_idnav_darktheme_roletabpanel_aria_labelledbynav_darktheme_tab______div_classbd_example________button_classunicauth_ui_button_unicauth_ui_button_darkspan_classunicauth_ui_icon_wrapperimg_classunicauth_ui_icon_alt_srchttpsunicauth_comalphafileslogo_svgspanspan_classunicauth_ui_text_unicauth_ui_text_longLogin_with_Unic_Authspanspan_classunicauth_ui_text_unicauth_ui_text_shortUnic_Authspanbutton______div______div________div_classbd_clipboardbutton_typebutton_classbtn_clipboard_title_data_bs_original_titleCopy_to_clipboardCopybuttondiv________pre_classno_gapcode_classlanguage_markup_line_breakxmpbutton_classunicauth_ui_button_unicauth_ui_button_darkspan_classunicauth_ui_icon_wrapperimg_classunicauth_ui_icon_alt_srchttpsunicauth_comalphafileslogo_svgspanspan_classunicauth_ui_text_unicauth_ui_text_longLogin_with_Unic_Authspanspan_classunicauth_ui_text_unicauth_ui_text_shortUnic_Authspanbuttonxmpcodepre______div____div____div_classtab_pane_fade_idnav_lighttheme_roletabpanel_aria_labelledbynav_lighttheme_tab______div_classbd_example________button_classunicauth_ui_button_unicauth_ui_button_lightspan_classunicauth_ui_icon_wrapperimg_classunicauth_ui_icon_alt_srchttpsunicauth_comalphafileslogo_svgspanspan_classunicauth_ui_text_unicauth_ui_text_longLogin_with_Unic_Authspanspan_classunicauth_ui_text_unicauth_ui_text_shortUnic_Authspanbutton______div______div________div_classbd_clipboardbutton_typebutton_classbtn_clipboard_title_data_bs_original_titleCopy_to_clipboardCopybuttondiv________pre_classno_gapcode_classlanguage_markup_line_breakxmpbutton_classunicauth_ui_button_unicauth_ui_button_lightspan_classunicauth_ui_icon_wrapperimg_classunicauth_ui_icon_alt_srchttpsunicauth_comalphafileslogo_svgspanspan_classunicauth_ui_text_unicauth_ui_text_longLogin_with_Unic_Authspanspan_classunicauth_ui_text_unicauth_ui_text_shortUnic_Authspanbuttonxmpcodepre______div____div__div__pThe_styles_used_in_these_examples_can_be_found_a_href__demofilesunicauth_ui_cssherea_psection_Factor_AuthenticationThe_call_to_authenticate_the_factor_is_similar_to_the__Login_Authenticatication_sectionLogin_Authentication_but_you_have_to_use_the_data_factorUrl_returned_from_the__2FA_creation_operationCreate2FA__Calling_the_factorUrlAfter_creating_the_factor_authentication_you_will_receive_the_factorUrl_to_be_opened_by_the_user_for_his_acceptance_br_Data_ReturnAfter_the_user_accepts_the_factor_authentication_on_Unic_Auth_App_the_page_will_be_redirected_to_the_returnUrl_with_the__parameters_operation2FAWebhook__check_the__2FA_creation_operationCreate2FA_section_for_the_returnUrl_creation_pHere_is_one_example_of_the_redirected_URLpdiv__div_classbd_clipboardbutton_typebutton_classbtn_clipboard_title_data_bs_original_titleCopy_to_clipboardCopybuttondiv__precode_idcodeRedirectedUrl2fa_classlanguage_uri_word_breakhttpsunicauth_comalphademospan_classtoken_taguserIDspanspan_classtoken_attr_value6a731465539d9ca2776fdeec709bce4ac5a420426a803b0dc937521352972b8bspanspan_classtoken_tagsessionIDspanspan_classtoken_attr_valuesession5mCrfGYEW7zJ68i7zwUhBuBxNiYpABobwspanspan_classtoken_tagauthIDspanspan_classtoken_attr_valueauthPT9zzReqtp5Sq4ogEaNmP1tsrtm1ssmsQspanspan_classtoken_tagtypespanspan_classtoken_attr_valuetwoFactorspanspan_classtoken_tagcustomIDspanspan_classtoken_attr_valueany_custom_dataspanspan_classtoken_tagsignaturespanspan_classtoken_attr_value69XzMPOPuAStHcMJub4LaC56u8cnYyiZHC7cteIed0spancodepredivpp.<br>
* The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
* <p>
* An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
* <pre>
* var circleAuth = require('index'); // See note below*.
* var xxxSvc = new circleAuth.XxxApi(); // Allocate the API class we're going to use.
* var yyyModel = new circleAuth.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
* and put the application logic within the callback function.</em>
* </p>
* <p>
* A non-AMD browser application (discouraged) might do something like this:
* <pre>
* var xxxSvc = new circleAuth.XxxApi(); // Allocate the API class we're going to use.
* var yyy = new circleAuth.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* </p>
* @module index
* @version 1.0.0
*/
export {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient,

    /**
     * The Create2FARequest model constructor.
     * @property {module:model/Create2FARequest}
     */
    Create2FARequest,

    /**
     * The Create2FAResponse model constructor.
     * @property {module:model/Create2FAResponse}
     */
    Create2FAResponse,

    /**
     * The ExpireUserSessionRequest model constructor.
     * @property {module:model/ExpireUserSessionRequest}
     */
    ExpireUserSessionRequest,

    /**
     * The ExpireUserSessionRequestData model constructor.
     * @property {module:model/ExpireUserSessionRequestData}
     */
    ExpireUserSessionRequestData,

    /**
     * The ExpireUserSessionResponse model constructor.
     * @property {module:model/ExpireUserSessionResponse}
     */
    ExpireUserSessionResponse,

    /**
     * The ExpireUserSessionResponseData model constructor.
     * @property {module:model/ExpireUserSessionResponseData}
     */
    ExpireUserSessionResponseData,

    /**
     * The GetSessionResponse model constructor.
     * @property {module:model/GetSessionResponse}
     */
    GetSessionResponse,

    /**
     * The GetSessionResponseData model constructor.
     * @property {module:model/GetSessionResponseData}
     */
    GetSessionResponseData,

    /**
     * The GetUserSessionResponse model constructor.
     * @property {module:model/GetUserSessionResponse}
     */
    GetUserSessionResponse,

    /**
     * The GetUserSessionResponseData model constructor.
     * @property {module:model/GetUserSessionResponseData}
     */
    GetUserSessionResponseData,

    /**
     * The Model2FARequestData model constructor.
     * @property {module:model/Model2FARequestData}
     */
    Model2FARequestData,

    /**
     * The Model2FAResponseData model constructor.
     * @property {module:model/Model2FAResponseData}
     */
    Model2FAResponseData,

    /**
     * The ResponseError model constructor.
     * @property {module:model/ResponseError}
     */
    ResponseError,

    /**
    * The CircleAuthApi service constructor.
    * @property {module:api/CircleAuthApi}
    */
    CircleAuthApi
};
