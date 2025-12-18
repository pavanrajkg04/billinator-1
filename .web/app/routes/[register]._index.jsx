import {Fragment,useCallback,useContext,useEffect} from "react"
import {Box as RadixThemesBox,Button as RadixThemesButton,Callout as RadixThemesCallout,Flex as RadixThemesFlex,Heading as RadixThemesHeading,Link as RadixThemesLink,Text as RadixThemesText,TextArea as RadixThemesTextArea,TextField as RadixThemesTextField} from "@radix-ui/themes"
import {Link as ReactRouterLink} from "react-router"
import {ArrowLeft as LucideArrowLeft,Check as LucideCheck,TriangleAlert as LucideTriangleAlert} from "lucide-react"
import {EventLoopContext,StateContexts} from "$/utils/context"
import {ReflexEvent,isNotNullOrUndefined,isTrue} from "$/utils/state"
import DebounceInput from "react-debounce-input"
import {jsx} from "@emotion/react"




function Callout__text_f15b6c9f7586049f4e9cf0be9dd2f5f6 () {
  const reflex___state____state__state____global_state__pages___auth____auth_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___auth____auth_state)



  return (
    jsx(RadixThemesCallout.Text,{},reflex___state____state__state____global_state__pages___auth____auth_state.reg_error_rx_state_)
  )
}


function Fragment_01e2d6022c7e34cf08cf80a3723cf1de () {
  const reflex___state____state__state____global_state__pages___auth____auth_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___auth____auth_state)



  return (
    jsx(Fragment,{},(!((reflex___state____state__state____global_state__pages___auth____auth_state.reg_error_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(jsx(Fragment,{},jsx(RadixThemesCallout.Root,{color:"red",css:({ ["icon"] : "triangle_alert", ["width"] : "100%", ["marginBottom"] : "4" })},jsx(RadixThemesCallout.Icon,{},jsx(LucideTriangleAlert,{},)),jsx(Callout__text_f15b6c9f7586049f4e9cf0be9dd2f5f6,{},)))):(jsx(Fragment,{},))))
  )
}


function Fragment_bfd92a3a3214ea694c83522ddc3161d2 () {
  const reflex___state____state__state____global_state__pages___auth____auth_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___auth____auth_state)



  return (
    jsx(Fragment,{},(reflex___state____state__state____global_state__pages___auth____auth_state.reg_success_rx_state_?(jsx(Fragment,{},jsx(RadixThemesCallout.Root,{color:"green",css:({ ["icon"] : "check", ["width"] : "100%", ["marginBottom"] : "4" })},jsx(RadixThemesCallout.Icon,{},jsx(LucideCheck,{},)),jsx(RadixThemesCallout.Text,{},"Registration successful! Redirecting to login...")))):(jsx(Fragment,{},))))
  )
}


function Debounceinput_8e110ad5b55125dc1c49dd0490d9b3ee () {
  const reflex___state____state__state____global_state__pages___auth____auth_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___auth____auth_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_f7914bc4542bd78e122d6078e46d0821 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___auth____auth_state.set_reg_tenant_name", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_f7914bc4542bd78e122d6078e46d0821,placeholder:"Business Name *",size:"3",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___auth____auth_state.reg_tenant_name_rx_state_) ? reflex___state____state__state____global_state__pages___auth____auth_state.reg_tenant_name_rx_state_ : "")},)
  )
}


function Debounceinput_f17e9ccf342bfe65a9816c082c7dd931 () {
  const reflex___state____state__state____global_state__pages___auth____auth_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___auth____auth_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_0823262f4325a91d7503578bd4227ba7 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___auth____auth_state.set_reg_tenant_gstin", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_0823262f4325a91d7503578bd4227ba7,placeholder:"GSTIN (optional)",size:"3",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___auth____auth_state.reg_tenant_gstin_rx_state_) ? reflex___state____state__state____global_state__pages___auth____auth_state.reg_tenant_gstin_rx_state_ : "")},)
  )
}


function Debounceinput_865dff07c79d2c6f3e521d08677fbe09 () {
  const reflex___state____state__state____global_state__pages___auth____auth_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___auth____auth_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_19eee5242ea1030c750155ac94a300dd = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___auth____auth_state.set_reg_tenant_address", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextArea,onChange:on_change_19eee5242ea1030c750155ac94a300dd,placeholder:"Address",size:"3",value:reflex___state____state__state____global_state__pages___auth____auth_state.reg_tenant_address_rx_state_},)
  )
}


function Debounceinput_9d3ba7b98a82b85d2b52a2d98f0e025b () {
  const reflex___state____state__state____global_state__pages___auth____auth_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___auth____auth_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_e0531683dc11d6671c9fa10e7bf1ff6a = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___auth____auth_state.set_reg_tenant_city", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_e0531683dc11d6671c9fa10e7bf1ff6a,placeholder:"City",size:"3",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___auth____auth_state.reg_tenant_city_rx_state_) ? reflex___state____state__state____global_state__pages___auth____auth_state.reg_tenant_city_rx_state_ : "")},)
  )
}


function Debounceinput_da9248ff07aad4b51c6c41d7e9816e71 () {
  const reflex___state____state__state____global_state__pages___auth____auth_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___auth____auth_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_26514ab080c4cf2576be9bc173d177e9 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___auth____auth_state.set_reg_tenant_state", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_26514ab080c4cf2576be9bc173d177e9,placeholder:"State",size:"3",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___auth____auth_state.reg_tenant_state_rx_state_) ? reflex___state____state__state____global_state__pages___auth____auth_state.reg_tenant_state_rx_state_ : "")},)
  )
}


function Debounceinput_23c0b733b837e3fc0068da1e26d9ce8c () {
  const reflex___state____state__state____global_state__pages___auth____auth_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___auth____auth_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_cabc129de210de1fa0ab1d19110f16fd = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___auth____auth_state.set_reg_tenant_pincode", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_cabc129de210de1fa0ab1d19110f16fd,placeholder:"Pincode",size:"3",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___auth____auth_state.reg_tenant_pincode_rx_state_) ? reflex___state____state__state____global_state__pages___auth____auth_state.reg_tenant_pincode_rx_state_ : "")},)
  )
}


function Debounceinput_1c893f8e643967bde89ddbae154ce2d7 () {
  const reflex___state____state__state____global_state__pages___auth____auth_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___auth____auth_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_0d8742005ec26e97b9345c4dd5ef706e = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___auth____auth_state.set_reg_tenant_phone", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_0d8742005ec26e97b9345c4dd5ef706e,placeholder:"Phone",size:"3",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___auth____auth_state.reg_tenant_phone_rx_state_) ? reflex___state____state__state____global_state__pages___auth____auth_state.reg_tenant_phone_rx_state_ : "")},)
  )
}


function Debounceinput_f2bb976a05f883ff9e224e22e173f966 () {
  const reflex___state____state__state____global_state__pages___auth____auth_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___auth____auth_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_5fd3c29454170757426a8fe733865e6b = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___auth____auth_state.set_reg_tenant_email", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_5fd3c29454170757426a8fe733865e6b,placeholder:"Email *",size:"3",type:"email",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___auth____auth_state.reg_tenant_email_rx_state_) ? reflex___state____state__state____global_state__pages___auth____auth_state.reg_tenant_email_rx_state_ : "")},)
  )
}


function Debounceinput_5a6c26b9fbfd8bbd61c66409949def29 () {
  const reflex___state____state__state____global_state__pages___auth____auth_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___auth____auth_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_ae9e74f06127b5af540b3305a5677a05 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___auth____auth_state.set_reg_full_name", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_ae9e74f06127b5af540b3305a5677a05,placeholder:"Full Name *",size:"3",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___auth____auth_state.reg_full_name_rx_state_) ? reflex___state____state__state____global_state__pages___auth____auth_state.reg_full_name_rx_state_ : "")},)
  )
}


function Debounceinput_814549b88e3180484382e8fef50072ea () {
  const reflex___state____state__state____global_state__pages___auth____auth_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___auth____auth_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_c616bdd217b32856d4b2e49aea1b1410 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___auth____auth_state.set_reg_username", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_c616bdd217b32856d4b2e49aea1b1410,placeholder:"Username *",size:"3",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___auth____auth_state.reg_username_rx_state_) ? reflex___state____state__state____global_state__pages___auth____auth_state.reg_username_rx_state_ : "")},)
  )
}


function Debounceinput_2b60a9768364d369e05cd165235c81c5 () {
  const reflex___state____state__state____global_state__pages___auth____auth_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___auth____auth_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_d7480d682880eb06258920e84fc83b55 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___auth____auth_state.set_reg_password", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_d7480d682880eb06258920e84fc83b55,placeholder:"Password *",size:"3",type:"password",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___auth____auth_state.reg_password_rx_state_) ? reflex___state____state__state____global_state__pages___auth____auth_state.reg_password_rx_state_ : "")},)
  )
}


function Button_ba12463ad28d496d21e7ca449df1fe0d () {
  const reflex___state____state__state____global_state__pages___auth____auth_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___auth____auth_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_bd49f5c8ae1fafe4ec46f5c8b12b1332 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___auth____auth_state.register", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"blue",css:({ ["width"] : "100%", ["paddingTop"] : "6", ["paddingBottom"] : "6", ["marginTop"] : "2" }),loading:reflex___state____state__state____global_state__pages___auth____auth_state.is_loading_rx_state_,onClick:on_click_bd49f5c8ae1fafe4ec46f5c8b12b1332,size:"3"},"Create Account")
  )
}


export default function Component() {





  return (
    jsx(Fragment,{},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["minHeight"] : "100vh", ["background"] : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }),direction:"column",gap:"0"},jsx(RadixThemesBox,{css:({ ["width"] : "100%", ["background"] : "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)", ["boxShadow"] : "0 2px 8px rgba(0,0,0,0.1)" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["paddingInlineStart"] : "6", ["paddingInlineEnd"] : "6", ["paddingTop"] : "4", ["paddingBottom"] : "4" }),direction:"row",gap:"3"},jsx(RadixThemesLink,{asChild:true,css:({ ["&:hover"] : ({ ["opacity"] : "0.8" }) })},jsx(ReactRouterLink,{to:"/"},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",direction:"row",gap:"2"},jsx(LucideArrowLeft,{css:({ ["color"] : "white" }),size:20},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "white" }),size:"4",weight:"medium"},"Back to Home")))),jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(RadixThemesHeading,{css:({ ["color"] : "white" }),size:"6",weight:"bold"},"Billinator"),jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(RadixThemesBox,{css:({ ["width"] : "120px" })},))),jsx(RadixThemesFlex,{css:({ ["display"] : "flex", ["alignItems"] : "center", ["justifyContent"] : "center", ["width"] : "100%", ["flex"] : "1", ["paddingTop"] : "8", ["paddingBottom"] : "8", ["paddingInlineStart"] : "4", ["paddingInlineEnd"] : "4" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "700px", ["maxWidth"] : "95%", ["padding"] : "8", ["border"] : "1px solid", ["borderColor"] : "gray.200", ["borderRadius"] : "xl", ["background"] : "white", ["boxShadow"] : "0 4px 16px rgba(0,0,0,0.1)", ["maxHeight"] : "90vh", ["overflowY"] : "auto" }),direction:"column",gap:"6"},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"2"},jsx(RadixThemesHeading,{css:({ ["background"] : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", ["backgroundClip"] : "text", ["color"] : "transparent", ["marginBottom"] : "2" }),size:"8",weight:"bold"},"Create Your Account"),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.600", ["marginBottom"] : "6" }),size:"4"},"Register your business and start managing your billing")),jsx(Fragment_01e2d6022c7e34cf08cf80a3723cf1de,{},),jsx(Fragment_bfd92a3a3214ea694c83522ddc3161d2,{},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesBox,{css:({ ["padding"] : "6", ["background"] : "gray.50", ["borderRadius"] : "lg", ["marginBottom"] : "4" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"3"},jsx(RadixThemesHeading,{css:({ ["color"] : "gray.800", ["marginBottom"] : "4" }),size:"5",weight:"bold"},"Business Information"),jsx(Debounceinput_8e110ad5b55125dc1c49dd0490d9b3ee,{},),jsx(Debounceinput_f17e9ccf342bfe65a9816c082c7dd931,{},),jsx(Debounceinput_865dff07c79d2c6f3e521d08677fbe09,{},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(Debounceinput_9d3ba7b98a82b85d2b52a2d98f0e025b,{},),jsx(Debounceinput_da9248ff07aad4b51c6c41d7e9816e71,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",gap:"3"},jsx(Debounceinput_23c0b733b837e3fc0068da1e26d9ce8c,{},),jsx(Debounceinput_1c893f8e643967bde89ddbae154ce2d7,{},)),jsx(Debounceinput_f2bb976a05f883ff9e224e22e173f966,{},))),jsx(RadixThemesBox,{css:({ ["padding"] : "6", ["background"] : "gray.50", ["borderRadius"] : "lg", ["marginBottom"] : "4" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"3"},jsx(RadixThemesHeading,{css:({ ["color"] : "gray.800", ["marginBottom"] : "4" }),size:"5",weight:"bold"},"Admin User Account"),jsx(Debounceinput_5a6c26b9fbfd8bbd61c66409949def29,{},),jsx(Debounceinput_814549b88e3180484382e8fef50072ea,{},),jsx(Debounceinput_2b60a9768364d369e05cd165235c81c5,{},))),jsx(Button_ba12463ad28d496d21e7ca449df1fe0d,{},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["marginTop"] : "4" }),direction:"row",justify:"center",gap:"2"},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.600" }),size:"3"},"Already have an account?"),jsx(RadixThemesLink,{asChild:true,css:({ ["color"] : "blue.600", ["&:hover"] : ({ ["textDecoration"] : "underline" }) }),size:"3",weight:"medium"},jsx(ReactRouterLink,{to:"/login"},"Login Here"))))))),jsx("title",{},"Register - Billinator"),jsx("meta",{content:"favicon.ico",property:"og:image"},))
  )
}