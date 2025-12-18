import {Fragment,useCallback,useContext,useEffect} from "react"
import {Box as RadixThemesBox,Button as RadixThemesButton,Callout as RadixThemesCallout,Flex as RadixThemesFlex,Heading as RadixThemesHeading,Link as RadixThemesLink,Text as RadixThemesText,TextField as RadixThemesTextField} from "@radix-ui/themes"
import {Link as ReactRouterLink} from "react-router"
import {ArrowLeft as LucideArrowLeft,TriangleAlert as LucideTriangleAlert} from "lucide-react"
import {EventLoopContext,StateContexts} from "$/utils/context"
import {ReflexEvent,isNotNullOrUndefined,isTrue} from "$/utils/state"
import DebounceInput from "react-debounce-input"
import {jsx} from "@emotion/react"




function Callout__text_0025fc267dce71469323650d7bf09214 () {
  const reflex___state____state__state____global_state__pages___auth____auth_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___auth____auth_state)



  return (
    jsx(RadixThemesCallout.Text,{},reflex___state____state__state____global_state__pages___auth____auth_state.login_error_rx_state_)
  )
}


function Fragment_2ebd87577fbdbc3cd2ad4f3cb5853a6a () {
  const reflex___state____state__state____global_state__pages___auth____auth_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___auth____auth_state)



  return (
    jsx(Fragment,{},(!((reflex___state____state__state____global_state__pages___auth____auth_state.login_error_rx_state_?.valueOf?.() === ""?.valueOf?.()))?(jsx(Fragment,{},jsx(RadixThemesCallout.Root,{color:"red",css:({ ["icon"] : "triangle_alert", ["width"] : "100%", ["marginBottom"] : "4" })},jsx(RadixThemesCallout.Icon,{},jsx(LucideTriangleAlert,{},)),jsx(Callout__text_0025fc267dce71469323650d7bf09214,{},)))):(jsx(Fragment,{},))))
  )
}


function Debounceinput_0d3e4e4d8442b0bfd50adb713f47cb5f () {
  const reflex___state____state__state____global_state__pages___auth____auth_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___auth____auth_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_0f4736c2ad14301abb24541ffaa706b9 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___auth____auth_state.set_login_tenant_id", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_0f4736c2ad14301abb24541ffaa706b9,placeholder:"Tenant ID (optional)",size:"3",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___auth____auth_state.login_tenant_id_rx_state_) ? reflex___state____state__state____global_state__pages___auth____auth_state.login_tenant_id_rx_state_ : "")},)
  )
}


function Debounceinput_1bf6a0ec3633915d19a2341aa3b1d378 () {
  const reflex___state____state__state____global_state__pages___auth____auth_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___auth____auth_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_0f5e48a778581a57bc51059344e8f7eb = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___auth____auth_state.set_login_username", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_0f5e48a778581a57bc51059344e8f7eb,placeholder:"Username",size:"3",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___auth____auth_state.login_username_rx_state_) ? reflex___state____state__state____global_state__pages___auth____auth_state.login_username_rx_state_ : "")},)
  )
}


function Debounceinput_c80a4e23d034edb1dc44462278418f51 () {
  const reflex___state____state__state____global_state__pages___auth____auth_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___auth____auth_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_2aed5631405dbd4e8f0c367ad38cf508 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___auth____auth_state.set_login_password", ({ ["value"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["width"] : "100%" }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_2aed5631405dbd4e8f0c367ad38cf508,placeholder:"Password",size:"3",type:"password",value:(isNotNullOrUndefined(reflex___state____state__state____global_state__pages___auth____auth_state.login_password_rx_state_) ? reflex___state____state__state____global_state__pages___auth____auth_state.login_password_rx_state_ : "")},)
  )
}


function Button_4d151ad27a39977b8646e36d85ce4b6e () {
  const reflex___state____state__state____global_state__pages___auth____auth_state = useContext(StateContexts.reflex___state____state__state____global_state__pages___auth____auth_state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_432da4fb18ff2752855666165cbda6f2 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.state____global_state.pages___auth____auth_state.login", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"blue",css:({ ["width"] : "100%", ["paddingTop"] : "6", ["paddingBottom"] : "6", ["marginTop"] : "4" }),loading:reflex___state____state__state____global_state__pages___auth____auth_state.is_loading_rx_state_,onClick:on_click_432da4fb18ff2752855666165cbda6f2,size:"3"},"Login")
  )
}


export default function Component() {





  return (
    jsx(Fragment,{},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["minHeight"] : "100vh", ["background"] : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }),direction:"column",gap:"0"},jsx(RadixThemesBox,{css:({ ["width"] : "100%", ["background"] : "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)", ["boxShadow"] : "0 2px 8px rgba(0,0,0,0.1)" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["paddingInlineStart"] : "6", ["paddingInlineEnd"] : "6", ["paddingTop"] : "4", ["paddingBottom"] : "4" }),direction:"row",gap:"3"},jsx(RadixThemesLink,{asChild:true,css:({ ["&:hover"] : ({ ["opacity"] : "0.8" }) })},jsx(ReactRouterLink,{to:"/"},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",direction:"row",gap:"2"},jsx(LucideArrowLeft,{css:({ ["color"] : "white" }),size:20},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "white" }),size:"4",weight:"medium"},"Back to Home")))),jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(RadixThemesHeading,{css:({ ["color"] : "white" }),size:"6",weight:"bold"},"Billinator"),jsx(RadixThemesFlex,{css:({ ["flex"] : 1, ["justifySelf"] : "stretch", ["alignSelf"] : "stretch" })},),jsx(RadixThemesBox,{css:({ ["width"] : "120px" })},))),jsx(RadixThemesFlex,{css:({ ["display"] : "flex", ["alignItems"] : "center", ["justifyContent"] : "center", ["width"] : "100%", ["flex"] : "1", ["paddingTop"] : "8", ["paddingBottom"] : "8" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "450px", ["padding"] : "8", ["border"] : "1px solid", ["borderColor"] : "gray.200", ["borderRadius"] : "xl", ["background"] : "white", ["boxShadow"] : "0 4px 16px rgba(0,0,0,0.1)" }),direction:"column",gap:"6"},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"2"},jsx(RadixThemesHeading,{css:({ ["background"] : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", ["backgroundClip"] : "text", ["color"] : "transparent", ["marginBottom"] : "2" }),size:"8",weight:"bold"},"Welcome Back"),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.600", ["marginBottom"] : "6" }),size:"4"},"Sign in to your Billinator account")),jsx(Fragment_2ebd87577fbdbc3cd2ad4f3cb5853a6a,{},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"4"},jsx(Debounceinput_0d3e4e4d8442b0bfd50adb713f47cb5f,{},),jsx(Debounceinput_1bf6a0ec3633915d19a2341aa3b1d378,{},),jsx(Debounceinput_c80a4e23d034edb1dc44462278418f51,{},),jsx(Button_4d151ad27a39977b8646e36d85ce4b6e,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["marginTop"] : "4" }),direction:"row",justify:"center",gap:"2"},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "gray.600" }),size:"3"},"Don't have an account?"),jsx(RadixThemesLink,{asChild:true,css:({ ["color"] : "blue.600", ["&:hover"] : ({ ["textDecoration"] : "underline" }) }),size:"3",weight:"medium"},jsx(ReactRouterLink,{to:"/register"},"Register Now")))))),jsx("title",{},"Login - Billinator"),jsx("meta",{content:"favicon.ico",property:"og:image"},))
  )
}